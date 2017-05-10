class Phacker.Game.Diamonds

    constructor: (@gm) ->
        @_fle_ = 'Diamonds'

        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.dmds = # as diamonds
            n: 100 # number of diamonds
            msg_bsk: 'not yet'

        @dmds_grp = @gm.add.physicsGroup()       # basket body group; real bodies
        @dmds_grp.enableBody = true

        @one_dmds_grp(549,50, 'blue_ball')
        @one_dmds_grp(549,60, 'pink_ball')
        @one_dmds_grp(549,70, 'green_ball')


    #.----------.----------
    # create a basket
    #.----------.----------
    one_dmds_grp: (x, y, bll) ->
       dmd = @dmds_grp.create x, y, bll
       #@gm.physics.arcade.enable dmd,Phaser.Physics.ARCADE
       dmd.body.bounce.y = 0
       dmd.body.bounce.x = .4
       #dmd.body.immovable = true
       #dmd.body.moves = false
       #dmd.body.gravity.y  = 0
       #dmd.body.velocity.x = 0



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
        #console.log @_fle_,': ','has collided'
        return true  # return it has collided


    #.----------.----------
    # collide with Himself : diamonds against diamonds
    #.----------.----------
    collide_himself: () ->
        if @gm.physics.arcade.collide(
            @dmds_grp, @dmds_grp # twice diamonds group
            -> return true
            (d1, d2)-> @when_collide_bsk(d1, d2)
            @
        ) then return @pm.mes_bsk # set message

        return 'no'

    #.----------.----------
    when_collide_bsk:(d1, d2) ->
        d1.body.velocity.x = 20
        d2.body.velocity.x = -20
        return true  # return it has collided



