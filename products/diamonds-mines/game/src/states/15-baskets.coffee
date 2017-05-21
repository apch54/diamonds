###  written by apch on 2017-05-07   ###

class Phacker.Game.Baskets

    constructor: (@gm) ->
        @_fle_ = 'Baskets'

        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.bsks =
            x1: @Pm.rop.x0 - @Pm.rop.w/2 + 2,         y1: @gm.parameters.rop.y0 + 2
            x2: @Pm.rop.x0 + @Pm.rop.w/2 - 2,         y2: @gm.parameters.rop.y0 + 2
            x3: @Pm.rop.x0 + @Pm.rop.w/2 - 2,         y3: @gm.parameters.rop.y0 + @Pm.rop.h - 10
            x4: @Pm.rop.x0 - @Pm.rop.w/2 + 2,         y4: @gm.parameters.rop.y0 + @Pm.rop.h - 2
            n: 6 #@gm.gameOptions.life # number of baskets
            v:@gm.gameOptions.vx0 #baskets velocity
        @pm.bsk_remaining = @pm.n

        @bska =[]                                   # Array of baskets object

        @bbO = new Phacker.Game.One_basket_body @gm # one basket body object
        @bsk_bdy_grp = @gm.add.physicsGroup()       # basket body group; real bodies
        @bsk_bdy_grp.enableBody = true

    #.----------.----------
    # create a basket
    #.----------.----------
    mk_bsk: () ->
            @bska.push bkO = new Phacker.Game.OneBasket @gm, {x: @pm.x2, y:@pm.y2, branch:'E' }

            #create bsk.real_body in the basket
            bkO.bsk.real_body = @bbO.mk_body(@bsk_bdy_grp, bkO)
            #console.log @_fle_,': ',@bsk_bdy_grp

    #.----------.----------
    #introduve all the baskets ant then move all  baskets
    #.----------.----------
    move: () ->
        # first complete basket group
        if (l = @bska.length) < @pm.n
            b = @bska[l-1].bsk
            li = 2*(@Pm.rop.w + @Pm.rop.h)/@pm.n # space tween 2 baskets

            if @gm.math.fuzzyEqual(b.y - @pm.y2 ,li, 4)  # an other basket
                @mk_bsk() # create a basket
                #console.log @_fle_,': ',@bska

        # then move the whole baskets
        for b in @bska
            b.move()
            # beware : same initialization in one-basket body
            b.bsk.real_body.lft.x = b.bsk.x - b.bsk.body.width / 2 + 7
            b.bsk.real_body.lft.y = b.bsk.y + 5
            b.bsk.real_body.lft.branch = b.bsk.branch


            b.bsk.real_body.rgt.x = b.bsk.x + b.bsk.body.width/2 - 7
            b.bsk.real_body.rgt.y = b.bsk.y + 5
            b.bsk.real_body.rgt.branch = b.bsk.branch

            b.bsk.real_body.btm.x = b.bsk.x + 2
            b.bsk.real_body.btm.y = b.bsk.y + b.bsk.body.height/2 + 3
            b.bsk.real_body.btm.branch = b.bsk.branch

            if b.bsk.branch is 'W'  # destroy basket
                if not b.bsk.real_body.btm.full  and not b.bsk.real_body.btm.out
                    b.bsk.real_body.btm.out = true
                    @twn_away(b.bsk)
                    @pm.bsk_remaining--

                #console.log @_fle_,': ',b.bsk.real_body.btm.full
            else if b.bsk.branch is 'E' then b.bsk.real_body.btm.full = false # emty the basket

        return @pm.bsk_remaining

    #.----------.----------
    # tween the basket for escaping when empty (not full)
    #.----------.----------
    twn_away: (bsk ) ->
        tw = @gm.add.tween bsk
        tw.to( {x: bsk.x - 200, y: bsk.y + 270 , alpha: 0}, 1500, Phaser.Easing.Linear.None, true, 0, 0 )
        tw.onComplete.add(# on complete destoy basket real_body
            ()->
                #console.log @_fle_,': ',bsk.real_body
                bsk.real_body.btm.body.enable = false
                bsk.real_body.lft.body.enable = false
                bsk.real_body.rgt.body.enable = false
            @
        )

