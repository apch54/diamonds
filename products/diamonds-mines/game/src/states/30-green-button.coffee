###  written by apch  on 2017-05-09 ###

class Phacker.Game.Button

    constructor: (@gm, @bskO, @dmdO) ->
        @_fle_ = 'Button'

        @pm = @gm.parameters.btn =
            x:  @gm.parameters.mec.x0 - 35
            y:  @gm.parameters.mec.y0 + 180
            w:  72
            h:  72
            game_started: false # for game starting
        @dmd = @dmdO.grp0

        @draw_button()

    #.----------.----------
    # draw button and define events
    #.----------.----------
    draw_button:()->
        @btn = @gm.add.button @pm.x, @pm.y, 'start_btn', @on_tap, @, 1, 1, 0

    #.----------.----------
    # on tap game gegins
    #.----------.----------
    on_tap: () ->
        @pm.start = true
        @bskO.mk_bsk()
        @btn.y = 800  # very low down
        @btn.alpha = 0

        #@dmdO.start_game()
        @pm.game_started = on

