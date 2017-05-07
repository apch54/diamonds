###  written by apch on 2017-05-07enemy  ###

class Phacker.Game.OneBasket

    constructor: (@gm,@lstP) ->
        @_fle_ = 'One bsk'
        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.bsk =        # one basket parameters
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

        if      @bsk.branch is 'N' then @bsk.body.velocity.x = @pm.vx  ;  @bsk.body.velocity.y = 0
        else if @bsk.branch is 'E' then @bsk.body.velocity.x = 0       ;  @bsk.body.velocity.y = @pm.vx
        else if @bsk.branch is 'S' then @bsk.body.velocity.x = -@pm.vx ;  @bsk.body.velocity.y = 0
        else if @bsk.branch is 'O' then @bsk.body.velocity.x = 0       ;  @bsk.body.velocity.y = @pm.vx

    #.----------.----------
    # move the basket around the rope
    #.----------.----------

    move: () ->
        if @bsk.branch is 'N' and @bsk.x > @Pm.bsks.x2
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
            @bsk.branch = 'O'

        else if @bsk.branch is 'O' and @bsk.y < @Pm.bsks.y1
            @bsk.body.velocity.x = @pm.vx
            @bsk.body.velocity.y = 0
            @bsk.branch = 'N'


