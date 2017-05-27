class Phacker.Game.Diamonds

    constructor: (@gm, @effO) ->
        @_fle_ = 'Diamonds'

        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.dmds = # as diamonds
            w: 10
            h:10
            n: 97 # number of diamonds
            dmd_in_game: 20
            vx0: 70 #initial  diamond vx
            vx1 : 1 # collision vx result with itself
            #vx2 : 40 # diamond collide with basket
            #msg_bsk:        'mes bsk'
            msg_bsks:[]     # all mes baskets
            msg_scl:        'mes scl'
            msg_itself:     'mes itself'
            names: ['blue_ball', 'green_ball', 'pink_ball', 'red_ball', 'yellow_ball']
            x1: @Pm.mec.x0 - @Pm.mec.w/2 + 5
            x2: @Pm.mec.x0 - 20
            x3: @Pm.mec.x0 + @Pm.mec.w/2 - 56
            y1: @Pm.mec.y0 + 65
            escX: if @gm.gameOptions.fullscreen  then 50 else 100 # when diamond is lost

            bounce: {x: .2, y: .05}
            g: @gm.gameOptions.gravityY #gravity.y

            last_transfert_date: 0
            dt: 250 # ms
            used:0
            dead:0


        @grp0 = @gm.add.physicsGroup()       # basket body group; real bodies
        @grp0.enableBody = true

        @grp1 = @gm.add.physicsGroup()       # basket body group; real bodies for initialization
        @grp1.enableBody = true

        @init()


    #.----------.----------
    # COLLIDE  with socle group
    #.----------.----------
    collide_socle: (scl) ->
        if @gm.physics.arcade.collide(
            @grp0, scl # grp0 is the dynamic group
            -> return true
            (dmd, scl)-> @when_collide_scl(dmd, scl)
            @
        ) then return @pm.mes_scl # set message

        return 'no'

    #.----------.----------
    when_collide_scl:(dmd, scl) ->
        #console.log @_fle_,': ',dmd
        dmd.has_scored = false
        switch scl.pos

            when 'hight-left'
                if @pm.x2-dmd.x > 40
                    dmd.body.velocity.x = @pm.vx0
                    dmd.y -= 1
                else
                    dmd.body.velocity.x = @pm.vx0/2
                    dmd.y -= .1
            when 'hight-right'
                if  dmd.x-@pm.x3 > 40
                    dmd.body.velocity.x = -@pm.vx0/2
                    #dmd.y -= 1
                else
                    dmd.body.velocity.x = -@pm.vx0
                    dmd.y -= .1
            when 'middle-left'
                dmd.x += .1
            when 'middle-right'
                dmd.x -= .1

            when 'bottom-left'
                dmd.y = scl.y-25
                @effO.play dmd      # play effect
                @twn_dmd dmd, @pm.escX, scl.y-15,500
                if not dmd.dead
                    @pm.dead++
                    dmd.dead = true
            when 'bottom-right'
                dmd.y = scl.y-30
                @effO.play dmd      # play effect
                @twn_dmd dmd, @Pm.bg.w - @pm.escX, scl.y-15,500
                if not dmd.dead
                    @pm.dead++
                    dmd.dead = true

            when 'gate'
                if scl.body.touching.left then dmd.y += 20
                else dmd.y = scl.y - @pm.h

        return true  # return it has collided

    #.----------.----------
    # COLLIDE  with baskets group
    #.----------.----------
    collide_baskets: (bsk) ->
        if @gm.physics.arcade.collide(
            @grp0, bsk # grp0 is the dynamic group
            -> return true
            (dmd, bsk)-> @when_collide_bsk(dmd, bsk)
            @
        ) then return @last_msg_bsk()# set message

        return 'no'

    #.----------.----------
    when_collide_bsk:(dmd, bsk) ->

        if not dmd.has_scored
             bsk.in.n++     # increase dmd in basket for bonus
             if bsk.in.n is 3
                 @pm.msg_bsks.push 'bonus' # score a bonus
             else @pm.msg_bsks.push 'win_bsk'
             #console.log @_fle_,': ',@pm.msg_bsks
             @effO.play dmd , 3    # play effect for bonus
        #else @pm.msg_bsks.push 'no'
        dmd.has_scored = true

        if bsk.typ is 'lft'
            if  -10 < (bsk.y - dmd.y - bsk.body.height/2) < 10
                @twn_move dmd, dmd.x+20, dmd.y+30
            else dmd.x += 1.5 #body.velocity.x += @pm.vx2

        else if bsk.typ is 'rgt'
            if  -10 < (bsk.y - dmd.y - bsk.body.height/2) < 10
                @twn_move dmd, dmd.x-20, dmd.y+30
            else  dmd.x -= 1.5 #body.velocity.x -= @pm.vx2;

        else if bsk.typ is 'btm'
            dmd.body.velocity.y =  0
            dmd.y = bsk.y-13 # dont sink
            bsk.full = true

        return true  # return it has collided

    #.----------.----------
    # collide grp0 with itself : diamonds against diamonds
    #.----------.----------

    collide_itself: () ->
        @grp0.setAll('body.immovable', true)
        if @gm.physics.arcade.collide(
            @grp0, @grp0 # twice diamonds group
            -> return true
            (d1, d2)-> @when_collide_itself(d1, d2)
            @
        ) then return @pm.mes_itself # set message

        return 'no'

    #.----------.----------
    when_collide_itself:(d1, d2) ->
        @grp0.setAll('body.immovable', false)
        if d1.x < d2.x
            d1.body.velocity.x -= @pm.vx1 if not d1.body.touching.up
            d2.body.velocity.x += @pm.vx1 if not d2.body.touching.up
            #console.log @_fle_,': ', d1.y , @Pm.sclb.y2
            d1.body.velocity.y  /=  2 #if d1.y in [@Pm.sclb.y2-20..@Pm.sclb.y2+20]
            #d2.body.velocity.y  =  0 if d2.y in [@Pm.sclb.y2-20..@Pm.sclb.y2+20]
        else
            d1.body.velocity.x -= @pm.vx1 if not d1.body.touching.up
            #d2.body.velocity.x -= @pm.vx1 if not d2.body.touching.up
            #d1.body.velocity.y  = d2.body.velocity.y = 0
        #if d1.y > d2.y then d1.body.velocity.y = 0
        return true  # return it has collided

    #.----------.----------
    # make tween  : go center basket
    # @dmd tween
    #.----------.----------

    twn_move: (dmd, x0, y0) ->
        @go_center = @gm.add.tween dmd
        @go_center.to(
            { x: x0, y: y0 }
            200, Phaser.Easing.Cubic.Out, true
        )

    twn_dmd: (dmd,x0,y0, t0 ) ->

        if not t0? then t0=1100
        tw = @gm.add.tween dmd
        tw.to( {x: x0, y: y0 , alpha: 0}, t0, Phaser.Easing.Linear.None, true, 0, 0 )
        tw.onComplete.add(# on complete destoy basket real_body
            ()->
                @grp0.remove(dmd)   # destroy dmd
                #@effO.play dmd      # play effect
            @
        )

    #.----------.----------
    # transfert diamonds from grp1 to grp0 (live group)
    #.----------.----------
    check_diamonds:()->
    #console.log @_fle_,': ',@grp1.length
        if @grp1.length < 1 then return @pm.dead
        if @grp0.length <= @pm.dmd_in_game-1
            switch @pm.used
                when 0,1,2,3      then @dmd_transfert(5)
                when 4,5,6,7      then @dmd_transfert(15) if @grp1.length > 15
                when 8,9,10,11    then @dmd_transfert(25) if @grp1.length > 25
                when 12,13,14,15  then @dmd_transfert(35) if @grp1.length > 35
                when 16,17,18,19  then @dmd_transfert(45) if @grp1.length > 45
                when 20,21,22,23  then @dmd_transfert(55) if @grp1.length > 45
                when 24,25,26,27  then @dmd_transfert(65) if @grp1.length > 65
                else @dmd_transfert(0)
            @pm.used++
        return @pm.dead
    #.----------.----------
    # Initialisation of all diamonds (ball)
    # Creation of balls
    #.----------.----------
    init : () ->
        x=@pm.x1;           y=@pm.y1+10
        col1=@gm.rnd.integerInRange(0,4) # colors
        col2=(col1+1)%5
        col3=(col1+2)%5

        for i in [0..@pm.n]
            if          (md = i%14) is 0    then    y-=10;      x=@pm.x1;   col = col1
            else if     md is 5             then    x=@pm.x2;               col = col2
            else if     md is 9             then    x=@pm.x3;               col = col3
            else x += 10
            dmd = @grp1.create x, y, @pm.names[col]
            dmd.frame2 =  @pm.names[col]

    #.----------.----------
    # create a diamond
    #.----------.----------
    one_dmds_grp: (x, y, bll) ->
        dmd = @grp0.create x, y, bll
        @gm.physics.arcade.enable dmd,Phaser.Physics.ARCADE
        d0.body.setCircle 5
#        dmd.body.bounce.y = 0.2
#        dmd.body.bounce.x = .2


    #.----------.----------
    # Tools for transfering diamond from group 1 to active group : group0
    #.----------.----------

    # deep copy diamonds from grp1 to grp0 ; (gr0 is the dynamic group)
    # and destroy diamonds from group 1 (grp1)
    #gravity & bounces are defined too
    dmd_transfert: (n) -> # n for the diamond number in grp1 begining at 0
       #if (l = @grp1.length) < 1 then return #n then n = l-1
       d1 = @grp1.getAt(n)
       d0 = @grp0.create d1.x, d1.y, d1.frame2
       #@gm.physics.arcade.enable d0,Phaser.Physics.ARCADE
       #d0.body.setCircle 5
       d0.body.gravity.y = @pm.g
       #d0.body.immovable = true
       d0.body.bounce.y = 0 #@pm.bounce.y
       d0.body.bounce.x = 0 # @pm.bounce.x
       d0.dead=false
       d0.has_scored = false

       d1.destroy()
       return d0

    #.----------.----------
    #manage the  messages baskets
    #.----------.----------

    last_msg_bsk:()->
        #console.log @_fle_,': ',@pm.msg_bsks.length
        if  @pm.msg_bsks.length is 0
            return 'no msg'
        else
            return @pm.msg_bsks.pop()











