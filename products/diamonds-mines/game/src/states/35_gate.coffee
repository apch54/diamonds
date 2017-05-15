class Phacker.Game.Gate

    constructor: (@gm, @scl_bdy) -> # scl_bdy stands for socle body
        @_fle_ = 'Gate'
        @Pm = @gm.parameters
        @pm = @Pm.gate =
            x0: @Pm.mec.x0 # gate paramaters
            y0: @Pm.mec.y0 + 148
            w: 28
            h: 7
        @pm.to ={x: @pm.x0 + @pm.w}
        @Pm.mouse_down = false

        @gm.input.onDown.add @on_mouse_down, @
        @gm.input.onUp.add   @on_mouse_up, @

        #add sprite gate in game socle body
        @gt = @scl_bdy.create @pm.x0, @pm.y0, 'mecanic_door_left'
        @gt.scale.setTo(@pm.w/14, @pm.h/3)
        @gt.anchor.setTo(0.5, 0) # On middle top of sprite gate
        @gt.body.immovable = true
        @gt.body.moves = false # required

    #.----------.----------
    # set mouse events
    #.----------.----------
    on_mouse_down: ->
        if not @Pm.btn.start then return
        @Pm.mouse_down = true
        @twn_close_open(@gt, @pm.to.x)

    on_mouse_up: ->
        if not @Pm.btn.start then return
        @Pm.mouse_down = false
        @twn_close_open(@gt, @pm.x0)

    #.----------.----------
    # make tweem moves
    #.----------.----------
    twn_close_open: (gt,x0) ->
        @gt_move = @gm.add.tween gt
        @gt_move.to(
            { x: x0 }
            250,  Phaser.Easing.Linear.None, true
        )
