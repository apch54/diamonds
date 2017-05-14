###  written by apch on 2017-05-12  ###

class Phacker.Game.Socle_body

    constructor: (@gm) ->
        @_fle_ = 'Socle body'
        @Pm = @gm.parameters    # globals parameters

        @pm = @Pm.sclb =        # socle_body parameters
            w:20,                   h:10
            x1: @Pm.dmds.x1 + 5,        y1: @Pm.dmds.y1+30  # hight-left of mecanic
            x2: @Pm.dmds.x2 + 2,        y2: @Pm.dmds.y1+60  # low-left of mecanic
            x3: @Pm.dmds.x2 + 43,                           # low-left of mecanic
            x4: @Pm.dmds.x3 + 60,                           # hight-right of mecanic

        @pm.y3= @pm.y2 + @pm.h                               # low-left of mecanic
        @pm.y4= @pm.y1                                      # hight-right of mecanic
        @pm.delta1= (@pm.y2 - @pm.y1) / (@pm.x2 - @pm.x1) # line inclinaison
        @pm.delta2= -@pm.delta1
        @bdy = @gm.add.physicsGroup()       # basket body group; real bodies
        @bdy.enableBody = true
        @mk_left()
        @mk_right()

    #.----------.----------
    # left, right  parts of body
    #.----------.----------
    mk_left:() ->

        dx= 0
        while dx < @pm.x2 - @pm.x1
            yy = @pm.y1 + dx * @pm.delta1
            @mk_rect @bdy, @pm.x1 + dx, yy, @pm.w, @pm.h # group,x,y,w,h
            dx += @pm.w + 3
        @last = @mk_rect @bdy, @pm.x2 - 6 , @pm.y2 + 12 , @pm.w, 28

    #.----------.----------

    mk_right:() ->
        @mk_rect @bdy, @pm.x3 , @last.y, @pm.w, 28
        dx= @pm.w + 3
        yy0= @pm.y3 - @pm.h
        while dx < @pm.x4 - @pm.x3
            yy = yy0 + dx * @pm.delta2
            last = @mk_rect @bdy, @pm.x3 + dx, yy, @pm.w, @pm.h
            dx += @pm.w + 3


    #.----------.----------
    #make a rectangle for  body
    #.----------.----------
    mk_rect: (bdy_grp, x,y, w, h) ->    # group,x,y,w,h
        b = @gm.add.bitmapData   w,  h

        # draw it
        b.ctx.beginPath()
        b.ctx.rect 0,0,  w, h
        b.ctx.fillStyle = '#00ffff'
        b.ctx.fill()

        #add sprite in game
        s = bdy_grp.create x, y, b
        s.body.immovable = true
        s.body.moves = false # require
        s.alpha = 1
        #s = @gm.add.sprite x, y, b
        s.anchor.setTo(0.5, 0.5)
        return s