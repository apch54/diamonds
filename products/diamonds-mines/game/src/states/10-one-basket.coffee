###  written by apch on 2017-05-07enemy  ###

class Phacker.Game.OneBasket

    constructor: (@gm,@lstP) ->
        @_fle_ = 'One bsk'
        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.bsk =         # one basket parameters
            # @bsk.x when basket must rotate up or down
            xrot1: @Pm.rop.x0 - @Pm.rop.w/3  # on north rope branch rotation x
            xrot2: @Pm.rop.x0 + @Pm.rop.w/6

            w: 42
            h: 54
            vx : 100
            names: ['blue_basket','green_basket','normal_basket','pink_basket','red_basket']

        @mk_bsk(@lstP ) # N stands for north

    #.----------.----------
    # make the basket and create @bsk sprite
    #.----------.----------

    mk_bsk:(lstP)-> # make the basket; lstp={x,y,branch}
        col = @gm.rnd.integerInRange(0,4)
        @bsk = @gm.add.sprite lstP.x,lstP.y, @pm.names[col] # 768x500
        @gm.physics.arcade.enable @bsk,Phaser.Physics.ARCADE
        @bsk.anchor.setTo(0.5, 0.5) # anchor in the middle of top

        @bsk.branch = lstP.branch
        @bsk.color = col
        @bsk.down = false

        if      @bsk.branch is 'N' then @bsk.body.velocity.x = @pm.vx  ;  @bsk.body.velocity.y = 0
        else if @bsk.branch is 'E' then @bsk.body.velocity.x = 0       ;  @bsk.body.velocity.y = @pm.vx
        else if @bsk.branch is 'S' then @bsk.body.velocity.x = -@pm.vx ;  @bsk.body.velocity.y = 0
        else if @bsk.branch is 'W' then @bsk.body.velocity.x = 0       ;  @bsk.body.velocity.y = -@pm.vx

    #.----------.----------
    # move the basket around the rope
    # 4 parts : 'N', 'E' ...
    #.----------.----------

    move: () ->
        if @bsk.branch is 'N'
            if not @bsk.down and @gm.math.fuzzyEqual(@bsk.x ,@pm.xrot1 , 4)  # rotation down
                @bsk.down = true
                @twn_up_down 160 # tween down

            else if @bsk.down and @gm.math.fuzzyEqual(@bsk.x ,@pm.xrot2 , 4)   # rotation down
                @bsk.down = false
                @twn_up_down 0  # tween up

            if @bsk.x > @Pm.bsks.x2
                @bsk.body.velocity.x = 0
                @bsk.body.velocity.y = @pm.vx
                @bsk.branch = 'E'

        else if @bsk.branch is 'E' and @bsk.y > @Pm.bsks.y3
            @bsk.body.velocity.x = -@pm.vx
            @bsk.body.velocity.y = 0
            @bsk.branch = 'S'

        else if @bsk.branch is 'S' and @bsk.x < @Pm.bsks.x4
            @bsk.body.velocity.x = 0
            @bsk.body.velocity.y = -@pm.vx
            @bsk.branch = 'W'

        else if @bsk.branch is 'W' and @bsk.y < @Pm.bsks.y1
            @bsk.body.velocity.x = @pm.vx
            @bsk.body.velocity.y = 0
            @bsk.branch = 'N'

    #.----------.----------
    # tween the basket for a rotation down(angle, 160 ou up ( angle :0)
    #.----------.----------
    twn_up_down: (a) ->
        t = 500
        tw = @gm.add.tween @bsk
        tw.to( {angle:a }, t, Phaser.Easing.Linear.None, true, 0, 0 )
