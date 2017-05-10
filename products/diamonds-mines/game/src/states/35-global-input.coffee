class Phacker.Game.Input

    constructor: (@gm) ->
        @_fle_ = 'Input'
        @Pm = @gm.parameters
        @Pm.mouse_down = false

        @gm.input.onDown.add @on_mouse_down, @
        @gm.input.onUp.add   @on_mouse_up, @


    #.----------.----------
    # set mouse events
    #.----------.----------
    on_mouse_down: ->
        if not @Pm.btn.start then return
        @Pm.mouse_down = true
        #console.log @_fle_,': ','Down', @Pm.mouse_down

    on_mouse_up: ->
        if not @Pm.btn.start then return
        @Pm.mouse_down = false
        #console.log @_fle_,': ','Up', @Pm.mouse_down
