###  written by apch  on 2017-05-010 ###

class Phacker.Game.One_basket_body

    constructor: (@gm) -> # obO stand for one_basket object
        @_fle_ = '1 bsk body'

        @Pm = @gm.parameters
        @pm = @Pm.obb = # stands for one basket object
            x: 100
        @mk_bdy()

    #.----------.----------
    # draw basket body
    #.----------.----------
    mk_bdy:()->
        console.log @_fle_,': ',@pm