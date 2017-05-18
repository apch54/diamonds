###  written by apch on 2017-05-12  ###

class Phacker.Game.Socle_body

    constructor: (@gm) ->
        @_fle_ = 'Socle body'
        @Pm = @gm.parameters    # globals parameters

        @pm = @Pm.sclb =        # socle_body parameters
            w:10,                   h:12
            x1: @Pm.dmds.x1 + 5,            y1: @Pm.dmds.y1+30  # hight-left of mecanic
            x2: @Pm.dmds.x2 + 2,            y2: @Pm.dmds.y1+60  # low-left of mecanic
            x3: @Pm.dmds.x2 + 43,                               # low-left of mecanic
            x4: @Pm.dmds.x3 + 60,                               # hight-right of mecanic
            x5: @Pm.btm.x0 - @Pm.btm.w/2,   y5: @Pm.btm.y0+20   # bottom left
            x6: @Pm.btm.x0 ,                y6: @Pm.btm.y0+3    # bottom middle
            x7: @Pm.btm.x0 + @Pm.btm.w/2                        # bottom right
        @pm.y3= @pm.y2 + @pm.h                                  # low-left of mecanic
        @pm.y4= @pm.y1                                          # hight-right of mecanic
        @pm.y7 =@pm.y5                                          # bottom right

        @pm.delta1= (@pm.y2 - @pm.y1) / (@pm.x2 - @pm.x1)       # line inclinaison height-left
        @pm.delta2= -@pm.delta1
        @pm.delta3= (@pm.y6 - @pm.y5) / (@pm.x6 - @pm.x5)       # line inclinaison height-left
        @pm.delta4= -@pm.delta3   # line inclinaison height-left

        @bdy = @gm.add.physicsGroup()                           # socle body group; real bodies
        @bdy.enableBody = true

        @mk_left()
        @mk_right()
        @mk_btm_left()
        @mk_btm_right()

    #.----------.----------
    # left, right  parts of body
    #.----------.----------
    mk_left:() ->
        dx= 0
        while dx < @pm.x2 - @pm.x1
            yy = @pm.y1 + dx * @pm.delta1
            @mk_rect @bdy, @pm.x1 + dx, yy, @pm.w, @pm.h ,'hight-left'# group,x,y,w,h
            dx += @pm.w
        @last = @mk_rect @bdy, @pm.x2 - 1 , @pm.y2 + 12 , @pm.w, 28,'hight-left'

    #.----------.----------
    mk_right:() ->
        @mk_rect @bdy, @pm.x3-3 , @last.y, @pm.w, 28, 'hight-right'
        dx= @pm.w-5
        yy0= @pm.y3 - @pm.h
        while dx < @pm.x4 - @pm.x3
            yy = yy0 + dx * @pm.delta2
            last = @mk_rect @bdy, @pm.x3 + dx, yy, @pm.w, @pm.h,'hight-right'
            dx += @pm.w

    #.----------.----------
    mk_btm_left:() ->
        dx= 0
        while dx < @pm.x6 - @pm.x5
            yy = @pm.y5 + dx * @pm.delta3
            @mk_rect @bdy, @pm.x5 + dx, yy, @pm.w, @pm.h ,'bottom-left'# group,x,y,w,h
            dx += @pm.w
        @last = @mk_rect @bdy, @pm.x6 , @pm.y6 , @pm.w, @pm.h,'bottom-left'

    #.----------.----------
    mk_btm_right:() ->
        dx= @pm.w + 3
        yy0= @last.y
        while dx < @pm.x7 - @pm.x6
            yy = yy0 + dx * @pm.delta4
            xx = @mk_rect @bdy, @pm.x6 + dx, yy, @pm.w, @pm.h,'bottom-right'
            dx += @pm.w

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
        s.alpha = 1

        #s = @gm.add.sprite x, y, b
        s.anchor.setTo(0.5, 0.5)
        s.pos = pos # location in body socle
        return s