class Phacker.Game.Gate

    constructor: (@gm, @sclO) -> # scl_bdy stands for socle body
        @_fle_ = 'Gate'
        @Pm = @gm.parameters
        @pm = @Pm.gate =
            x0: @Pm.mec.x0-14 # gate paramaters
            y0: @Pm.mec.y0 + 148
            w: 14
            h: 5
        #@pm.to ={x: @pm.x0 + @pm.w}
        @Pm.mouse_down = false

        @scl_bdy = @sclO.bdy

        @gm.input.onDown.add @on_mouse_down, @
        @gm.input.onUp.add   @on_mouse_up, @

        #add sprite gate in game socle body
        @gtl = @scl_bdy.create @pm.x0, @pm.y0, 'mecanic_door_left'
        #@gtl.scale.setTo(1, @pm.h/3)
        @gtl.anchor.setTo(0, 0.5) # On middle top of sprite gate
        @gtl.body.immovable = true
        @gtl.body.moves = false # required
        @gtl.pos ='gate'

        @gtr = @scl_bdy.create @pm.x0+28, @pm.y0, 'mecanic_door_right'
        @gtr.anchor.setTo(1, 0.5) # On middle top of sprite gate
        #@gtr.scale.setTo(1, @pm.h/3)
        @gtr.body.immovable = true
        @gtr.body.moves = false # required
        @gtr.pos ='gate'

        @rect = @mk_rect( @scl_bdy,  @pm.x0-@pm.w,  @pm.y0,  @pm.w*4, 20, 'gate')
        @rect.body.immovable = true
#        @gtl.body.enable = false
#        @gtr.body.enable = false

    #.----------.----------
    # set mouse events
    #.----------.----------
    on_mouse_down: ->
        if not @Pm.btn.start then return
        @Pm.mouse_down = true
        @gtl.body.enable = false
        @gtr.body.enable = false
        @rect.body.enable = false
        @twn_close_open(@gtl, 90)
        @twn_close_open(@gtr, -90)
        @twn_close_open_rect(@rect, @pm.x0+30)


    on_mouse_up: ->
        if not @Pm.btn.start then return
        @gtl.body.enable = true
        @gtr.body.enable = true
        @rect.body.enable = true
        @Pm.mouse_down = false
        @twn_close_open(@gtl, 0)
        @twn_close_open(@gtr, 0)
        @twn_close_open_rect(@rect, @pm.x0-14)

    #.----------.----------
    # make tweem moves
    #.----------.----------
    twn_close_open: (gt,a0) ->
        @gt_move = @gm.add.tween gt
        @gt_move.to(
            { angle: a0 }
            200,  Phaser.Easing.Linear.None, true
        )
    twn_close_open_rect: (gt,x0) ->
        @gt_move = @gm.add.tween gt
        @gt_move.to(
            { x: x0 }
            200,  Phaser.Easing.Linear.None, true
        )

    #.----------.----------
    #make a rectangle for  body
    #.----------.----------
    mk_rect: (bdy_grp, x,y, w, h, pos) ->    # group,x,y,w,h, pos
        b = @gm.add.bitmapData   w,  h

        # draw it
        b.ctx.beginPath()
        b.ctx.rect 0,0,  w, h
        b.ctx.fillStyle = '#00ffff'
        b.ctx.fill()

        #add sprite in game
        s = bdy_grp.create x, y, b
        s.body.immovable = true
        s.body.moves = false # required
        s.alpha = 0


        #s = @gm.add.sprite x, y, b
        #s.anchor.setTo(0.5, 0.5)
        s.pos = pos # location in body socle
        return s