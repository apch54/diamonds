###  written by apch on 2017-05-20 ###

class Phacker.Game.Rules

    constructor: (@gm, @bsksO) ->
        @_fle_ = 'Rules'

        @Pm = @gm.parameters # globals parameters
        @pm = @Pm.rls =
            #vx:     @bsksO.bska     # initial basket velocity
            dvx:   20               # variation of vx0
            scr:    @gm.ge.score
            lvl:    0                # level inside one game
            v: @Pm.bsks.v

        #console.log @_fle_,': ',@pm.vx

    #.----------.----------
    # checks rules an score to accélerate
    #.----------.----------
    check: ->
        #console.log @_fle_,': ',@bsksO.bska.length
        if @bsksO.bska.length < 6 then return
        switch @pm.lvl
            when 0
                if @gm.ge.score < 60 then return
                else
                    @speedup(@pm.v + @pm.dvx)
                    @pm.lvl = 1
            when 1
                if @gm.ge.score < 120 then return
                else
                    @speedup(@pm.v + @pm.dvx * 2)
                    @pm.lvl = 2
        console.log @_fle_,': ', @pm.lvl #@bsksO.bska[0].bsk.body.velocity.y

    #.----------.----------
    # acceleration depending on score
    #.----------.----------
    speedup: (v0)  ->
        for b in @bsksO.bska
            v = b.bsk.body.velocity
            b.pm.vx = v0
            if v.x < 0 then v.x = -v0
            else if v.x > 0 then v.x = v0
            else if v.y < 0 then v.y = -v0
            else if v.y > 0 then v.y = v0