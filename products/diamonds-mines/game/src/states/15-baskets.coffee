###  written by apch on 2017-05-07enemy  ###

class Phacker.Game.Baskets

    constructor: (@gm) ->
        @_fle_ = 'Baskets'

        @Pm = @gm.parameters    # globals parameters
        @pm = @Pm.bsks =

            names:['enemy2','enemy1',]
        @bska =[]

        @init() # init gpoup : emy

    #.----------.----------
    # all baskets initialiszation
    #.----------.----------

    init: () ->
        @bska.push bkO = new Phacker.Game.OneBasket @gm
