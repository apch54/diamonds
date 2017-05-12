class Phacker.Game.Diamonds

    constructor: (@gm) ->
        @_fle_ = 'Diamonds'

        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.dmds = # as diamonds
            n: 97 # number of diamonds
            vx1 : 30 # collision vx result with itself
            vx2 : 40 # diamond collide with basket
            msg_bsk: 'not yet'
            names: ['blue_ball', 'green_ball', 'pink_ball', 'red_ball', 'yellow_ball']
            x1: @Pm.mec.x0 - @Pm.mec.w/2 + 5
            x2: @Pm.mec.x0 - 20
            x3: @Pm.mec.x0 + @Pm.mec.w/2 - 56
            y1: @Pm.mec.y0 + 65
            bounce: {x: .2, y: .05}

        @grp0 = @gm.add.physicsGroup()       # basket body group; real bodies
        @grp0.enableBody = true

        @grp1 = @gm.add.physicsGroup()       # basket body group; real bodies for initialization
        @grp1.enableBody = true



        @init()
        d0 = @dmd_transfert(0);     d0.x = @Pm.rop.x0 + @Pm.rop.w/2 - 2;   d0.y=1
        d1 = @dmd_transfert(4);     d1.x = @Pm.rop.x0 + @Pm.rop.w/2 - 2;   d1.y=60
        d2 = @dmd_transfert(7);     d2.x = @Pm.rop.x0 + @Pm.rop.w/2 - 2;   d2.y=70

    #.----------.----------
    # COLLIDE  with baskets group
    #.----------.----------
    collide_baskets: (bsk) ->
        if @gm.physics.arcade.collide(
            @grp0, bsk
            -> return true
            (dmd, bsk)-> @when_collide_bsk(dmd, bsk)
            @
        ) then return @pm.mes_bsk # set message

        return 'no'

    #.----------.----------
    when_collide_bsk:(dmd, bsk) ->

        if bsk.typ is 'lft'
            if  -10 < (bsk.y - dmd.y - bsk.body.height/2) < 10
                @twn_go_center dmd, dmd.x+20, dmd.y+30
            else if  bsk.x < dmd.x then dmd.body.velocity.x += @pm.vx2

        else if bsk.typ is 'rgt'
            if  -10 < (bsk.y - dmd.y - bsk.body.height/2) < 10
                @twn_go_center dmd, dmd.x-20, dmd.y+30
            else if bsk.x > dmd.x then dmd.body.velocity.x -= @pm.vx2;

        else if bsk.typ is 'btm'
            dmd.body.velocity.y =  0
            dmd.y = bsk.y-15 # dont sink

        return true  # return it has collided


    #.----------.----------
    # collide grp0 with itself : diamonds against diamonds
    #.----------.----------
    collide_itself: () ->
        if @gm.physics.arcade.collide(
            @grp0, @grp0 # twice diamonds group
            -> return true
            (d1, d2)-> @when_collide_itself(d1, d2)
            @
        ) then return @pm.mes_bsk # set message

        return 'no'

    #.----------.----------
    when_collide_itself:(d1, d2) ->
        d1.body.velocity.x = @pm.vx1
        d2.body.velocity.x = -@pm.vx1
        return true  # return it has collided

    #.----------.----------
    # make tween  : go center basket
    # @dmd tween
    #.----------.----------
    twn_go_center: (dmd, x0, y0) ->
        @go_center = @gm.add.tween dmd
        @go_center.to(
            { x: x0, y: y0 }
            200, Phaser.Easing.Cubic.Out, true
        )

    #.----------.----------
    # Initialisation of all diamonds (ball)
    # Creation of ball
    #.----------.----------
    init : () ->
        x=@pm.x1;           y=@pm.y1+10
        col1=@gm.rnd.integerInRange(0,4)
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
    # create a basket
    #.----------.----------
    one_dmds_grp: (x, y, bll) ->
        dmd = @grp0.create x, y, bll
        #@gm.physics.arcade.enable dmd,Phaser.Physics.ARCADE
        dmd.body.bounce.y = 0.2
        dmd.body.bounce.x = .4


#.----------.----------
    # Tools
    #.----------.----------

    # deep copy diamonds from grp1 to grp0 ; (gr0 is the dynamic group)
    # and destroy diamonds from group 1 (grp1)
    dmd_transfert: (n) -> # n for the diamond number in grp1 begining at 0
       if (l = @grp1.length) < n then n = l-1
       d1 = @grp1.getAt(n)
       d0 = @grp0.create d1.x, d1.y+200, d1.frame2
       d1.body.bounce.y = @pm.bounce.y
       d1.body.bounce.x = @pm.bounce.x
       d1.destroy()
       return d0
       #@console.log @_fle_,': ',d0






