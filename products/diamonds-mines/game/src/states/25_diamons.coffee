class Phacker.Game.Diamonds

    constructor: (@gm) ->
        @_fle_ = 'Diamonds'

        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.dmds = # as diamonds
            n: 100 # number of diamonds
            msg_bsk: 'not yet'

        @dmds_grp = @gm.add.physicsGroup()       # basket body group; real bodies
        @dmds_grp.enableBody = true

        @mk_dmds_grp()

    #.----------.----------
    # create a basket
    #.----------.----------
    mk_dmds_grp: () ->
       console.log @_fle_,': ','in Diamonds'
       dmd = @dmds_grp.create 549, 50, 'blue_ball'
       #@gm.physics.arcade.enable dmd,Phaser.Physics.ARCADE
       dmd.body.bounce.y = .1
       dmd.body.bounce.x = .5
       dmd.body.gravity.y  = 0
       dmd.body.velocity.x = 0



    #.----------.----------
    # collide with baskets group
    #.----------.----------
    collide_baskets: (bsk) ->
        if @gm.physics.arcade.collide(
            @dmds_grp, bsk
            -> return true
            (dmd, bsk)-> @when_collide_bsk(dmd, bsk)
            @
        ) then return @pm.mes_bsk # set message

        return 'no'

    #.----------.----------
    when_collide_bsk:(dmd, bsk) ->
        console.log @_fle_,': ','has collided'
        return true  # return it has collided


