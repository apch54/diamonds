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

        @bska =[]

        @init() # init gpoup : emy

    #.----------.----------
    # all baskets initialiszation
    #.----------.----------
    init: () ->
        @bska.push bkO = new Phacker.Game.OneBasket @gm, {x:@pm.x1, y: @pm.y1, branch: 'N'}

    #.----------.----------
    # move all  baskets
    #.----------.----------
    move: () -> for b in @bska then b.move()

