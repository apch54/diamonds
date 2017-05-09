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

        @bska =[] #Array of baskets object

        #@init() # init gpoup : emy

    #.----------.----------
    # all baskets initialiszation
    #.----------.----------
    init: () ->
            @bska.push bkO = new Phacker.Game.OneBasket @gm, {x: @pm.x2, y:@pm.y2, branch:'E' }

    #.----------.----------
    # set x,y, branch basket at initialization
    # n is the number of baskets
    #.----------.----------
    set_xy: (num) ->
        li = 2*(@Pm.rop.w + @Pm.rop.h)*num/@pm.n

        if li < @Pm.rop.w
            xx = @pm.x1 + li
            yy = @pm.y1
            b = 'N'

        else if li < @Pm.rop.w + @Pm.rop.h
            xx = @pm.x2
            yy = @pm.y1 + li - @Pm.rop.w
            b = 'E'

        else if li < 2*@Pm.rop.w + @Pm.rop.h
            xx = @pm.x2 - ( li - @Pm.rop.w - @Pm.rop.h)
            yy = @pm.y3
            b = 'S'

        else if li < 2*(@Pm.rop.w + @Pm.rop.h)
            xx = @pm.x4
            yy = @pm.y3 - ( li - 2*@Pm.rop.w - @Pm.rop.h)
            b = 'W'
        console.log @_fle_,': ',li,xx, yy, b
        return {x: xx, y: yy, branch: b}


    #.----------.----------
    #introduve all the baskets ant then move all  baskets
    #.----------.----------
    move: () ->
        # first complete basket
        if (l = @bska.length) < @pm.n
            b = @bska[l-1].bsk
            li = 2*(@Pm.rop.w + @Pm.rop.h)/@pm.n # space tween 2 baskets

            if @gm.math.fuzzyEqual(b.y - @pm.y2 ,li, 4)  # an other basket
                @bska.push  new Phacker.Game.OneBasket @gm, {x: @pm.x2, y:@pm.y2, branch:'E' }

        # then move the whole baskets
        for b in @bska then b.move()

