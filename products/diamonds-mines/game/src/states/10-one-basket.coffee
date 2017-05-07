###  written by apch on 2017-05-07enemy  ###

class Phacker.Game.OneBasket

    constructor: (@gm) ->
        @_fle_ = 'One bsk'
        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.bsk =        # one basket parameters
            w: 42,                                    h: 54

            x1: @Pm.rop.x0 - @Pm.rop.w/2 + 2,         y1: @gm.parameters.rop.y0 + 2
            x2: @Pm.rop.x0 + @Pm.rop.w/2 - 2,         y2: @gm.parameters.rop.y0 + 2
            x3: @Pm.rop.x0 + @Pm.rop.w/2 - 2,         y3: @gm.parameters.rop.y0 + @Pm.rop.h - 2
            x4: @Pm.rop.x0 - @Pm.rop.w/2 + 2,         y4: @gm.parameters.rop.y0 + @Pm.rop.h - 2

            vx : 100

        @mk_bsk(@pm.x1,@pm.y1, 'N' ) # N stands for north
        @move()

    #.----------.----------
    # make the basket and create @bsk sprite
    #.----------.----------

    mk_bsk:(x,y, branch)-> # make the basket
        @bsk = @gm.add.sprite x,y, 'blue_basket' # 768x500
        @gm.physics.arcade.enable @bsk,Phaser.Physics.ARCADE
        @bsk.anchor.setTo(0.5, 0.5) # anchor in the middle of top

        @bsk.branch = branch

        if      @bsk.branch is 'N' then @bsk.body.velocity.x = @pm.vx  ;  @bsk.body.velocity.y = 0
        else if @bsk.branch is 'E' then @bsk.body.velocity.x = 0       ;  @bsk.body.velocity.y = @pm.vx
        else if @bsk.branch is 'S' then @bsk.body.velocity.x = -@pm.vx ;  @bsk.body.velocity.y = 0
        else if @bsk.branch is 'O' then @bsk.body.velocity.x = 0       ;  @bsk.body.velocity.y = @pm.vx

    #.----------.----------
    # move the basket around the rope
    #.----------.----------

    move: () ->
        if @bsk.branch is 'N' and @bsk.x > @pm.x2
            @bsk.body.velocity.x = 0
            @bsk.body.velocity.y = @pm.vx
            @bsk.branch = 'E'


        else if @bsk.branch is 'E' and @bsk.y > @pm.y3
            @bsk.body.velocity.x = -@pm.vx
            @bsk.body.velocity.y = 0
            @bsk.branch = 'S'

        else if @bsk.branch is 'S' and @bsk.x < @pm.x4
            @bsk.body.velocity.x = 0
            @bsk.body.velocity.y = -@pm.vx
            @bsk.branch = 'O'

        else if @bsk.branch is 'O' and @bsk.y < @pm.y1
            @bsk.body.velocity.x = @pm.vx
            @bsk.body.velocity.y = 0
            @bsk.branch = 'N'


