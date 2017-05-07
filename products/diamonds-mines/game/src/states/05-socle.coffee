###  written by apch on 2017-05-06
       ... --- ...
      |          ,---------------------------------.
      |.===.     | an other one : diamonds_mines   |
      {}o o{}    _)--------------------------------'
   ooO--(_)--Ooo-

###

class Phacker.Game.Socle

    constructor: (@gm) ->
        @_fle_ = 'Socle'

        @pm = @gm.parameters = {}

        @pm.bg = # background
            y0: 0
            w : if @gm.gameOptions.fullscreen  then 375 else 768
            h : if @gm.gameOptions.fullscreen  then 559 else 500
        @pm.bg.w2 = @pm.bg.w/2 # middle of background
        @pm.bg.x0 = @pm.bg.w2

        @pm.btm = # bottom platform
            x0: @pm.bg.w2
            w : 375
            h : 27
        @pm.btm.y0 = @pm.bg.h - @pm.btm.h

        @pm.rop = # rope
            x0: @pm.bg.w2
            w : 329
            h : 375
            r : 20 # rope radius at the four angles
        @pm.rop.y0 = (@pm.btm.y0 - @pm.rop.h )/2

        @pm.mec = # mechanic
            x0: @pm.bg.w2
            y0: @pm.rop.y0 + 60
            w : 286
            h : 150

        @pm.whl = # wheel
            y0: @pm.rop.y0 + 50
            w : 34
            h : 34
        @pm.whl.x1 = @pm.rop.x0 - @pm.rop.w/2  + @pm.rop.r
        @pm.whl.y1 = @pm.rop.y0 + @pm.rop.r
        @pm.whl.x2 = @pm.rop.x0 + @pm.rop.w/2  - @pm.rop.r
        @pm.whl.y2 = @pm.whl.y1
        @pm.whl.x3 = @pm.whl.x2
        @pm.whl.y3 = @pm.rop.y0 + @pm.rop.h - @pm.rop.r
        @pm.whl.x4 = @pm.whl.x1
        @pm.whl.y4 = @pm.whl.y3


        @draw_bg() # draw the whole background

    #.----------.----------
    # build socle
    #.----------.----------

    draw_bg: ->

        # background
        @bg = @gm.add.sprite @pm.bg.x0, @pm.bg.y0, 'bg_gameplay' # 768x500
        @bg.anchor.setTo(0.5, 0) # anchor in the middle of top

        # bottom
        @btm = @gm.add.sprite @pm.btm.x0, @pm.btm.y0, 'platform' # 375x27
        @btm.anchor.setTo(0.5, 0) # anchor in the middle of top

        # rope
        @rop = @gm.add.sprite @pm.rop.x0, @pm.rop.y0, 'rope' # 329x375
        @rop.anchor.setTo(0.5, 0) # anchor in the middle of top

        # mecanic
        @mec = @gm.add.sprite @pm.mec.x0, @pm.mec.y0, 'mecanic' # 283x150
        @mec.anchor.setTo(0.5, 0) # anchor in the middle of top

        # wheels
        @whl1 = @gm.add.sprite @pm.whl.x1, @pm.whl.y1, 'wheel' # 283x150
        @whl1.anchor.setTo(0.5, 0.5) # anchor in the middle of top
        @mk_tween @whl1, {  angle: 360  }, 1700

        @whl2 = @gm.add.sprite @pm.whl.x2, @pm.whl.y2, 'wheel' # 283x150
        @whl2.anchor.setTo(0.5, 0.5) # anchor in the middle of top
        @mk_tween @whl2, {  angle: 360  }, 1800

        @whl3 = @gm.add.sprite @pm.whl.x3, @pm.whl.y3, 'wheel' # 283x150
        @whl3.anchor.setTo(0.5, 0.5) # anchor in the middle of top
        @mk_tween @whl3, {  angle: 360  }, 1900

        @whl4 = @gm.add.sprite @pm.whl.x4, @pm.whl.y4, 'wheel' # 283x150
        @whl4.anchor.setTo(0.5, 0.5) # anchor in the middle of top
        @mk_tween @whl4, {  angle: 360  }, 2000

    #__________.__________
    # make twen for object with lst paramaters an during t
    # __________.__________
    mk_tween:(spt, lst , t) ->
        tw = @gm.add.tween spt
        tw.to( lst, t, Phaser.Easing.Linear.None, true, 0, -1 )



