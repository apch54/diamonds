###  written by apch  on 2017-05-010 ###

class Phacker.Game.One_basket_body

    constructor: (@gm) -> # obO stand for one_basket object
        @_fle_ = '1 bsk body'

        @Pm = @gm.parameters

        @pm = @Pm.obb = # stands for one basket object
            btm: 0


    #.----------.----------
    # draw basket body
    #.----------.----------
    mk_body:(bdy_grp, bkO)-> # bodygroup, one basket Object
        w = bkO.pm.w
        h = bkO.pm.h
        x= bkO.bsk.x
        y= bkO.bsk.y
        @btm = @mk_rect bdy_grp,  x + 1, y + bkO.pm.h/2 - 3, w - 12 , 2
        @lft = @mk_rect bdy_grp,  x - bkO.pm.w/2 + 6, y, 2 , h
        @rgt = @mk_rect bdy_grp,  x + bkO.pm.w/2 - 6, y, 2 , h

        return {lft: @lft,rgt: @rgt, btm: @btm}

        #bkO.bsk.body.velocity.y =0

    #.----------.----------
    #make a rectangle for bsk_body
    #.----------.----------
    mk_rect: (bdy_grp, x,y,w,h) ->
        # create the bit map data obj : b
        b = @gm.add.bitmapData   w,  h

        # draw it
        b.ctx.beginPath()
        b.ctx.rect 0,0,  w, h
        b.ctx.fillStyle = '#ff0000'
        b.ctx.fill()

        #add sprite in game
        s = bdy_grp.create x, y, b
        s.body.immovable = true
        #s = @gm.add.sprite x, y, b
        s.anchor.setTo(0.5, 0.5)
        return s

        #.----------.----------
        # make body basket follwing its sprite
        #.----------.----------
        follow: (spt) ->

