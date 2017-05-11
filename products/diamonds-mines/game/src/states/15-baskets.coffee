###  written by apch on 2017-05-07enemy  ###

class Phacker.Game.Baskets

    constructor: (@gm) ->
        @_fle_ = 'Baskets'

        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.bsks =
            x1: @Pm.rop.x0 - @Pm.rop.w/2 + 2,         y1: @gm.parameters.rop.y0 + 2
            x2: @Pm.rop.x0 + @Pm.rop.w/2 - 2,         y2: @gm.parameters.rop.y0 + 2
            x3: @Pm.rop.x0 + @Pm.rop.w/2 - 2,         y3: @gm.parameters.rop.y0 + @Pm.rop.h - 2
            x4: @Pm.rop.x0 - @Pm.rop.w/2 + 2,         y4: @gm.parameters.rop.y0 + @Pm.rop.h - 2
            n: 6 # number of baskets

        @bska =[]                                   # Array of baskets object

        @bbO = new Phacker.Game.One_basket_body @gm # one basket body object
        @bsk_bdy_grp = @gm.add.physicsGroup()       # basket body group; real bodies
        @bsk_bdy_grp.enableBody = true

    #.----------.----------
    # create a basket
    #.----------.----------
    mk_bsk: () ->
            @bska.push bkO = new Phacker.Game.OneBasket @gm, {x: @pm.x2, y:@pm.y2, branch:'E' }

            #create real_body in the basket
            bkO.real_body = @bbO.mk_body(@bsk_bdy_grp, bkO)
            #console.log @_fle_,': ',@bsk_bdy_grp

    #.----------.----------
    #introduve all the baskets ant then move all  baskets
    #.----------.----------
    move: () ->
        # first complete basket
        if (l = @bska.length) < @pm.n
            b = @bska[l-1].bsk
            li = 2*(@Pm.rop.w + @Pm.rop.h)/@pm.n # space tween 2 baskets

            if @gm.math.fuzzyEqual(b.y - @pm.y2 ,li, 4)  # an other basket
                @mk_bsk() # create a basket
                #console.log @_fle_,': ',@bska

        # then move the whole baskets
        for b in @bska
            b.move()

            b.real_body.lft.x = b.bsk.x - b.bsk.body.width / 2 + 2
            b.real_body.lft.y = b.bsk.y

            b.real_body.rgt.x = b.bsk.x + b.bsk.body.width/2 - 3
            b.real_body.rgt.y = b.bsk.y

            b.real_body.btm.x = b.bsk.x + 1
            b.real_body.btm.y = b.bsk.y + b.bsk.body.height/2 - 6
