
/*  written by apch on 2017-05-06
       ... --- ...
      |          ,---------------------------------.
      |.===.     | an other one : Diamonds mines   |
      {}o o{}    _)--------------------------------'
   ooO--(_)--Ooo-
 */

(function() {
  Phacker.Game.Socle = (function() {
    function Socle(gm) {
      this.gm = gm;
      this._fle_ = 'Socle';
      this.pm = this.gm.parameters = {};
      this.pm.bg = {
        y0: 0,
        w: this.gm.gameOptions.fullscreen ? 375 : 768,
        h: this.gm.gameOptions.fullscreen ? 559 : 500
      };
      this.pm.bg.w2 = this.pm.bg.w / 2;
      this.pm.bg.x0 = this.pm.bg.w2;
      this.pm.btm = {
        x0: this.pm.bg.w2,
        w: 375,
        h: 27
      };
      this.pm.btm.y0 = this.pm.bg.h - this.pm.btm.h;
      this.pm.rop = {
        x0: this.pm.bg.w2,
        w: 329,
        h: 375,
        r: 20
      };
      this.pm.rop.y0 = (this.pm.btm.y0 - this.pm.rop.h) / 2;
      this.pm.mec = {
        x0: this.pm.bg.w2,
        y0: this.pm.rop.y0 + 60,
        w: 286,
        h: 150
      };
      this.pm.whl = {
        y0: this.pm.rop.y0 + 50,
        w: 34,
        h: 34
      };
      this.pm.whl.x1 = this.pm.rop.x0 - this.pm.rop.w / 2 + this.pm.rop.r;
      this.pm.whl.y1 = this.pm.rop.y0 + this.pm.rop.r;
      this.pm.whl.x2 = this.pm.rop.x0 + this.pm.rop.w / 2 - this.pm.rop.r;
      this.pm.whl.y2 = this.pm.whl.y1;
      this.pm.whl.x3 = this.pm.whl.x2;
      this.pm.whl.y3 = this.pm.rop.y0 + this.pm.rop.h - this.pm.rop.r;
      this.pm.whl.x4 = this.pm.whl.x1;
      this.pm.whl.y4 = this.pm.whl.y3;
      this.draw_bg();
    }

    Socle.prototype.draw_bg = function() {
      this.bg = this.gm.add.sprite(this.pm.bg.x0, this.pm.bg.y0, 'bg_gameplay');
      this.bg.anchor.setTo(0.5, 0);
      this.btm = this.gm.add.sprite(this.pm.btm.x0, this.pm.btm.y0, 'platform');
      this.btm.anchor.setTo(0.5, 0);
      this.rop = this.gm.add.sprite(this.pm.rop.x0, this.pm.rop.y0, 'rope');
      this.rop.anchor.setTo(0.5, 0);
      this.mec = this.gm.add.sprite(this.pm.mec.x0, this.pm.mec.y0, 'mecanic');
      this.mec.anchor.setTo(0.5, 0);
      this.whl1 = this.gm.add.sprite(this.pm.whl.x1, this.pm.whl.y1, 'wheel');
      this.whl1.anchor.setTo(0.5, 0.5);
      this.mk_tween(this.whl1, {
        angle: 360
      }, 1700);
      this.whl2 = this.gm.add.sprite(this.pm.whl.x2, this.pm.whl.y2, 'wheel');
      this.whl2.anchor.setTo(0.5, 0.5);
      this.mk_tween(this.whl2, {
        angle: 360
      }, 1800);
      this.whl3 = this.gm.add.sprite(this.pm.whl.x3, this.pm.whl.y3, 'wheel');
      this.whl3.anchor.setTo(0.5, 0.5);
      this.mk_tween(this.whl3, {
        angle: 360
      }, 1900);
      this.whl4 = this.gm.add.sprite(this.pm.whl.x4, this.pm.whl.y4, 'wheel');
      this.whl4.anchor.setTo(0.5, 0.5);
      return this.mk_tween(this.whl4, {
        angle: 360
      }, 2000);
    };

    Socle.prototype.mk_tween = function(spt, lst, t) {
      var tw;
      tw = this.gm.add.tween(spt);
      return tw.to(lst, t, Phaser.Easing.Linear.None, true, 0, -1);
    };

    return Socle;

  })();

}).call(this);


/*  written by apch on 2017-05-07enemy */

(function() {
  Phacker.Game.OneBasket = (function() {
    function OneBasket(gm, lstP1) {
      this.gm = gm;
      this.lstP = lstP1;
      this._fle_ = 'One bsk';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.bsk = {
        xrot1: this.Pm.rop.x0 - 70,
        xrot2: this.Pm.rop.x0 + this.Pm.rop.w / 6,
        w: 42,
        h: 54,
        vx: 60,
        names: ['blue_basket', 'green_basket', 'normal_basket', 'pink_basket', 'red_basket']
      };
      this.mk_bsk(this.lstP);
    }

    OneBasket.prototype.mk_bsk = function(lstP) {
      var col;
      col = this.gm.rnd.integerInRange(0, 4);
      this.bsk = this.gm.add.sprite(lstP.x, lstP.y, this.pm.names[col]);
      this.gm.physics.arcade.enable(this.bsk, Phaser.Physics.ARCADE);
      this.bsk.anchor.setTo(0.5, 0.5);
      this.bsk.branch = lstP.branch;
      this.bsk.color = col;
      this.bsk.down = false;
      this.bsk.alpha = 1;
      if (this.bsk.branch === 'N') {
        this.bsk.body.velocity.x = this.pm.vx;
        return this.bsk.body.velocity.y = 0;
      } else if (this.bsk.branch === 'E') {
        this.bsk.body.velocity.x = 0;
        return this.bsk.body.velocity.y = this.pm.vx;
      } else if (this.bsk.branch === 'S') {
        this.bsk.body.velocity.x = -this.pm.vx;
        return this.bsk.body.velocity.y = 0;
      } else if (this.bsk.branch === 'W') {
        this.bsk.body.velocity.x = 0;
        return this.bsk.body.velocity.y = -this.pm.vx;
      }
    };

    OneBasket.prototype.move = function() {
      if (this.bsk.branch === 'N') {
        if (!this.bsk.down && this.gm.math.fuzzyEqual(this.bsk.x, this.pm.xrot1, 4)) {
          this.bsk.down = true;
          this.twn_up_down(160);
          this.gm.time.events.add(Phaser.Timer.SECOND * 0.2, function() {
            return this.bsk.real_body.btm.body.enable = false;
          }, this);
        } else if (this.bsk.down && this.gm.math.fuzzyEqual(this.bsk.x, this.pm.xrot2, 4)) {
          this.bsk.down = false;
          this.twn_up_down(0);
          this.bsk.real_body.btm.body.enable = true;
        }
        if (this.bsk.x > this.Pm.bsks.x2) {
          this.bsk.body.velocity.x = 0;
          this.bsk.body.velocity.y = this.pm.vx;
          return this.bsk.branch = 'E';
        }
      } else if (this.bsk.branch === 'E' && this.bsk.y > this.Pm.bsks.y3) {
        this.bsk.body.velocity.x = -this.pm.vx;
        this.bsk.body.velocity.y = 0;
        return this.bsk.branch = 'S';
      } else if (this.bsk.branch === 'S' && this.bsk.x < this.Pm.bsks.x4) {
        this.bsk.body.velocity.x = 0;
        this.bsk.body.velocity.y = -this.pm.vx;
        return this.bsk.branch = 'W';
      } else if (this.bsk.branch === 'W' && this.bsk.y < this.Pm.bsks.y1) {
        this.bsk.body.velocity.x = this.pm.vx;
        this.bsk.body.velocity.y = 0;
        return this.bsk.branch = 'N';
      }
    };

    OneBasket.prototype.twn_up_down = function(a) {
      var t, tw;
      t = 500;
      tw = this.gm.add.tween(this.bsk);
      return tw.to({
        angle: a
      }, t, Phaser.Easing.Linear.None, true, 0, 0);
    };

    return OneBasket;

  })();

}).call(this);


/*  written by apch on 2017-05-07enemy */

(function() {
  Phacker.Game.Baskets = (function() {
    function Baskets(gm) {
      this.gm = gm;
      this._fle_ = 'Baskets';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.bsks = {
        x1: this.Pm.rop.x0 - this.Pm.rop.w / 2 + 2,
        y1: this.gm.parameters.rop.y0 + 2,
        x2: this.Pm.rop.x0 + this.Pm.rop.w / 2 - 2,
        y2: this.gm.parameters.rop.y0 + 2,
        x3: this.Pm.rop.x0 + this.Pm.rop.w / 2 - 2,
        y3: this.gm.parameters.rop.y0 + this.Pm.rop.h - 2,
        x4: this.Pm.rop.x0 - this.Pm.rop.w / 2 + 2,
        y4: this.gm.parameters.rop.y0 + this.Pm.rop.h - 2,
        n: 6
      };
      this.bska = [];
      this.bbO = new Phacker.Game.One_basket_body(this.gm);
      this.bsk_bdy_grp = this.gm.add.physicsGroup();
      this.bsk_bdy_grp.enableBody = true;
    }

    Baskets.prototype.mk_bsk = function() {
      var bkO;
      this.bska.push(bkO = new Phacker.Game.OneBasket(this.gm, {
        x: this.pm.x2,
        y: this.pm.y2,
        branch: 'E'
      }));
      return bkO.bsk.real_body = this.bbO.mk_body(this.bsk_bdy_grp, bkO);
    };

    Baskets.prototype.move = function() {
      var b, i, l, len, li, ref, results;
      if ((l = this.bska.length) < this.pm.n) {
        b = this.bska[l - 1].bsk;
        li = 2 * (this.Pm.rop.w + this.Pm.rop.h) / this.pm.n;
        if (this.gm.math.fuzzyEqual(b.y - this.pm.y2, li, 4)) {
          this.mk_bsk();
        }
      }
      ref = this.bska;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        b = ref[i];
        b.move();
        b.bsk.real_body.lft.x = b.bsk.x - b.bsk.body.width / 2 + 7;
        b.bsk.real_body.lft.y = b.bsk.y + 5;
        b.bsk.real_body.lft.branch = b.bsk.branch;
        b.bsk.real_body.rgt.x = b.bsk.x + b.bsk.body.width / 2 - 7;
        b.bsk.real_body.rgt.y = b.bsk.y + 5;
        b.bsk.real_body.rgt.branch = b.bsk.branch;
        b.bsk.real_body.btm.x = b.bsk.x + 2;
        b.bsk.real_body.btm.y = b.bsk.y + b.bsk.body.height / 2 + 3;
        results.push(b.bsk.real_body.btm.branch = b.bsk.branch);
      }
      return results;
    };

    return Baskets;

  })();

}).call(this);


/*  written by apch  on 2017-05-010 */

(function() {
  Phacker.Game.One_basket_body = (function() {
    function One_basket_body(gm) {
      this.gm = gm;
      this._fle_ = '1 bsk body';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.obb = {
        btm: 0
      };
    }

    One_basket_body.prototype.mk_body = function(bdy_grp, bkO) {
      var h, w, x, y;
      w = bkO.pm.w;
      h = bkO.pm.h + 7;
      x = bkO.bsk.x;
      y = bkO.bsk.y;
      this.btm = this.mk_rect(bdy_grp, x - 2, y + bkO.pm.h / 2 - 3, w - 11, 10);
      this.btm.typ = 'btm';
      this.lft = this.mk_rect(bdy_grp, x - bkO.pm.w / 2 + 2, y + 5, 5, h);
      this.lft.typ = 'lft';
      this.rgt = this.mk_rect(bdy_grp, x + bkO.pm.w / 2 - 3, y + 5, 5, h);
      this.rgt.typ = 'rgt';
      return {
        lft: this.lft,
        rgt: this.rgt,
        btm: this.btm
      };
    };

    One_basket_body.prototype.mk_rect = function(bdy_grp, x, y, w, h) {
      var b, s;
      b = this.gm.add.bitmapData(w, h);
      b.ctx.beginPath();
      b.ctx.rect(0, 0, w, h);
      if (w > 20) {
        b.ctx.fillStyle = '#ff0000';
      } else {
        b.ctx.fillStyle = '#00ff00';
      }
      b.ctx.fill();
      s = bdy_grp.create(x, y, b);
      s.body.immovable = true;
      s.body.moves = false;
      s.alpha = 0;
      s.anchor.setTo(0.5, 0.5);
      return s;
    };

    return One_basket_body;

  })();

}).call(this);

(function() {
  Phacker.Game.Diamonds = (function() {
    function Diamonds(gm) {
      this.gm = gm;
      this._fle_ = 'Diamonds';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.dmds = {
        n: 97,
        vx0: 100,
        vx1: 20,
        msg_bsk: 'mes bsk',
        msg_scl: 'mes scl',
        msg_itself: 'mes itself',
        names: ['blue_ball', 'green_ball', 'pink_ball', 'red_ball', 'yellow_ball'],
        x1: this.Pm.mec.x0 - this.Pm.mec.w / 2 + 5,
        x2: this.Pm.mec.x0 - 20,
        x3: this.Pm.mec.x0 + this.Pm.mec.w / 2 - 56,
        y1: this.Pm.mec.y0 + 65,
        bounce: {
          x: .2,
          y: .05
        },
        g: 300,
        last_transfert_date: 0,
        dt: 250,
        used: 0,
        dmd_in_game: 5
      };
      this.grp0 = this.gm.add.physicsGroup();
      this.grp0.enableBody = true;
      this.grp1 = this.gm.add.physicsGroup();
      this.grp1.enableBody = true;
      this.init();
    }

    Diamonds.prototype.check_diamonds = function() {
      if (this.grp1.length < 1) {
        return;
      }
      if (this.grp0.length <= this.pm.dmd_in_game - 1) {
        switch (this.pm.used) {
          case 0:
          case 1:
          case 2:
          case 3:
            this.dmd_transfert(5);
            break;
          case 4:
          case 5:
          case 6:
          case 7:
            this.dmd_transfert(15);
            break;
          case 8:
          case 9:
          case 10:
          case 11:
            this.dmd_transfert(25);
            break;
          case 12:
          case 13:
          case 14:
          case 15:
            this.dmd_transfert(35);
            break;
          case 16:
          case 17:
          case 18:
          case 19:
            this.dmd_transfert(45);
            break;
          case 20:
          case 21:
          case 22:
          case 23:
            this.dmd_transfert(55);
            break;
          case 24:
          case 25:
          case 26:
          case 27:
            this.dmd_transfert(65);
            break;
          default:
            this.dmd_transfert(0);
        }
        return this.pm.used++;
      }
    };

    Diamonds.prototype.collide_socle = function(scl) {
      if (this.gm.physics.arcade.collide(this.grp0, scl, function() {
        return true;
      }, function(dmd, scl) {
        return this.when_collide_scl(dmd, scl);
      }, this)) {
        return this.pm.mes_scl;
      }
      return 'no';
    };

    Diamonds.prototype.when_collide_scl = function(dmd, scl) {
      switch (scl.pos) {
        case 'hight-left':
          dmd.body.velocity.x = this.pm.vx0;
          break;
        case 'hight-right':
          dmd.body.velocity.x = -this.pm.vx0;
          break;
        case 'bottom-left':
          if (dmd.x < this.Pm.btm.x0 - this.Pm.btm.w / 2) {
            this.grp0.remove(dmd);
          } else {
            dmd.body.velocity.x = -this.pm.vx0;
          }
          break;
        case 'bottom-right':
          if (dmd.x > this.Pm.btm.x0 + this.Pm.btm.w / 2 - 5) {
            this.grp0.remove(dmd);
          } else {
            dmd.body.velocity.x = this.pm.vx0;
          }
      }
      return true;
    };

    Diamonds.prototype.collide_baskets = function(bsk) {
      if (this.gm.physics.arcade.collide(this.grp0, bsk, function() {
        return true;
      }, function(dmd, bsk) {
        return this.when_collide_bsk(dmd, bsk);
      }, this)) {
        return this.pm.mes_bsk;
      }
      return 'no';
    };

    Diamonds.prototype.when_collide_bsk = function(dmd, bsk) {
      var ref, ref1;
      if (bsk.typ === 'lft') {
        if ((-10 < (ref = bsk.y - dmd.y - bsk.body.height / 2) && ref < 10)) {
          this.twn_move(dmd, dmd.x + 20, dmd.y + 30);
        } else {
          dmd.x += 2;
        }
      } else if (bsk.typ === 'rgt') {
        if ((-10 < (ref1 = bsk.y - dmd.y - bsk.body.height / 2) && ref1 < 10)) {
          this.twn_move(dmd, dmd.x - 20, dmd.y + 30);
        } else {
          dmd.x -= 2;
        }
      } else if (bsk.typ === 'btm') {
        dmd.body.velocity.y = 0;
        dmd.y = bsk.y - 15;
      }
      return true;
    };

    Diamonds.prototype.collide_itself = function() {
      if (this.gm.physics.arcade.collide(this.grp0, this.grp0, function() {
        return true;
      }, function(d1, d2) {
        return this.when_collide_itself(d1, d2);
      }, this)) {
        return this.pm.mes_itself;
      }
      return 'no';
    };

    Diamonds.prototype.when_collide_itself = function(d1, d2) {
      return true;
    };

    Diamonds.prototype.twn_move = function(dmd, x0, y0) {
      this.go_center = this.gm.add.tween(dmd);
      return this.go_center.to({
        x: x0,
        y: y0
      }, 200, Phaser.Easing.Cubic.Out, true);
    };

    Diamonds.prototype.init = function() {
      var col, col1, col2, col3, dmd, i, j, md, ref, results, x, y;
      x = this.pm.x1;
      y = this.pm.y1 + 10;
      col1 = this.gm.rnd.integerInRange(0, 4);
      col2 = (col1 + 1) % 5;
      col3 = (col1 + 2) % 5;
      results = [];
      for (i = j = 0, ref = this.pm.n; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        if ((md = i % 14) === 0) {
          y -= 10;
          x = this.pm.x1;
          col = col1;
        } else if (md === 5) {
          x = this.pm.x2;
          col = col2;
        } else if (md === 9) {
          x = this.pm.x3;
          col = col3;
        } else {
          x += 10;
        }
        dmd = this.grp1.create(x, y, this.pm.names[col]);
        results.push(dmd.frame2 = this.pm.names[col]);
      }
      return results;
    };

    Diamonds.prototype.one_dmds_grp = function(x, y, bll) {
      var dmd;
      return dmd = this.grp0.create(x, y, bll);
    };

    Diamonds.prototype.dmd_transfert = function(n) {
      var d0, d1;
      d1 = this.grp1.getAt(n);
      d0 = this.grp0.create(d1.x, d1.y, d1.frame2);
      d0.body.gravity.y = this.pm.g;
      d0.body.bounce.y = 0;
      d0.body.bounce.x = 0;
      d1.destroy();
      return d0;
    };

    return Diamonds;

  })();

}).call(this);


/*  written by apch  on 2017-05-09 */

(function() {
  Phacker.Game.Button = (function() {
    function Button(gm, bskO, dmdO) {
      this.gm = gm;
      this.bskO = bskO;
      this.dmdO = dmdO;
      this._fle_ = 'Button';
      this.pm = this.gm.parameters.btn = {
        x: this.gm.parameters.mec.x0 - 35,
        y: this.gm.parameters.mec.y0 + 180,
        w: 72,
        h: 72,
        game_started: false
      };
      this.dmd = this.dmdO.grp0;
      this.draw_button();
    }

    Button.prototype.draw_button = function() {
      return this.btn = this.gm.add.button(this.pm.x, this.pm.y, 'start_btn', this.on_tap, this, 1, 1, 0);
    };

    Button.prototype.on_tap = function() {
      this.pm.start = true;
      this.bskO.mk_bsk();
      this.btn.y = 800;
      this.btn.alpha = 0;
      return this.pm.game_started = true;
    };

    return Button;

  })();

}).call(this);

(function() {
  Phacker.Game.Gate = (function() {
    function Gate(gm, scl_bdy) {
      this.gm = gm;
      this.scl_bdy = scl_bdy;
      this._fle_ = 'Gate';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.gate = {
        x0: this.Pm.mec.x0,
        y0: this.Pm.mec.y0 + 148,
        w: 30,
        h: 8
      };
      this.pm.to = {
        x: this.pm.x0 + this.pm.w
      };
      this.Pm.mouse_down = false;
      this.gm.input.onDown.add(this.on_mouse_down, this);
      this.gm.input.onUp.add(this.on_mouse_up, this);
      this.gt = this.scl_bdy.create(this.pm.x0, this.pm.y0, 'mecanic_door_left');
      this.gt.scale.setTo(this.pm.w / 14, this.pm.h / 3);
      this.gt.anchor.setTo(0.5, 0);
      this.gt.body.immovable = true;
      this.gt.body.moves = false;
    }

    Gate.prototype.on_mouse_down = function() {
      if (!this.Pm.btn.start) {
        return;
      }
      this.Pm.mouse_down = true;
      return this.twn_close_open(this.gt, this.pm.to.x);
    };

    Gate.prototype.on_mouse_up = function() {
      if (!this.Pm.btn.start) {
        return;
      }
      this.Pm.mouse_down = false;
      return this.twn_close_open(this.gt, this.pm.x0);
    };

    Gate.prototype.twn_close_open = function(gt, x0) {
      this.gt_move = this.gm.add.tween(gt);
      return this.gt_move.to({
        x: x0
      }, 250, Phaser.Easing.Linear.None, true);
    };

    return Gate;

  })();

}).call(this);


/*  written by apch on 2017-05-12 */

(function() {
  Phacker.Game.Socle_body = (function() {
    function Socle_body(gm) {
      this.gm = gm;
      this._fle_ = 'Socle body';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.sclb = {
        w: 10,
        h: 12,
        x1: this.Pm.dmds.x1 + 5,
        y1: this.Pm.dmds.y1 + 30,
        x2: this.Pm.dmds.x2 + 2,
        y2: this.Pm.dmds.y1 + 60,
        x3: this.Pm.dmds.x2 + 43,
        x4: this.Pm.dmds.x3 + 60,
        x5: this.Pm.btm.x0 - this.Pm.btm.w / 2,
        y5: this.Pm.btm.y0 + 20,
        x6: this.Pm.btm.x0,
        y6: this.Pm.btm.y0 + 3,
        x7: this.Pm.btm.x0 + this.Pm.btm.w / 2
      };
      this.pm.y3 = this.pm.y2 + this.pm.h;
      this.pm.y4 = this.pm.y1;
      this.pm.y7 = this.pm.y5;
      this.pm.delta1 = (this.pm.y2 - this.pm.y1) / (this.pm.x2 - this.pm.x1);
      this.pm.delta2 = -this.pm.delta1;
      this.pm.delta3 = (this.pm.y6 - this.pm.y5) / (this.pm.x6 - this.pm.x5);
      this.pm.delta4 = -this.pm.delta3;
      this.bdy = this.gm.add.physicsGroup();
      this.bdy.enableBody = true;
      this.mk_left();
      this.mk_right();
      this.mk_btm_left();
      this.mk_btm_right();
    }

    Socle_body.prototype.mk_left = function() {
      var dx, yy;
      dx = 0;
      while (dx < this.pm.x2 - this.pm.x1) {
        yy = this.pm.y1 + dx * this.pm.delta1;
        this.mk_rect(this.bdy, this.pm.x1 + dx, yy, this.pm.w, this.pm.h, 'hight-left');
        dx += this.pm.w + 3;
      }
      return this.last = this.mk_rect(this.bdy, this.pm.x2 - 1, this.pm.y2 + 12, this.pm.w, 28, 'hight-left');
    };

    Socle_body.prototype.mk_right = function() {
      var dx, last, results, yy, yy0;
      this.mk_rect(this.bdy, this.pm.x3 - 3, this.last.y, this.pm.w, 28, 'hight-right');
      dx = this.pm.w - 5;
      yy0 = this.pm.y3 - this.pm.h;
      results = [];
      while (dx < this.pm.x4 - this.pm.x3) {
        yy = yy0 + dx * this.pm.delta2;
        last = this.mk_rect(this.bdy, this.pm.x3 + dx, yy, this.pm.w, this.pm.h, 'hight-right');
        results.push(dx += this.pm.w + 3);
      }
      return results;
    };

    Socle_body.prototype.mk_btm_left = function() {
      var dx, yy;
      dx = 0;
      while (dx < this.pm.x6 - this.pm.x5) {
        yy = this.pm.y5 + dx * this.pm.delta3;
        this.mk_rect(this.bdy, this.pm.x5 + dx, yy, this.pm.w, this.pm.h, 'bottom-left');
        dx += this.pm.w + 3;
      }
      return this.last = this.mk_rect(this.bdy, this.pm.x6, this.pm.y6, this.pm.w, this.pm.h, 'bottom-left');
    };

    Socle_body.prototype.mk_btm_right = function() {
      var dx, results, xx, yy, yy0;
      dx = this.pm.w + 3;
      yy0 = this.last.y;
      results = [];
      while (dx < this.pm.x7 - this.pm.x6) {
        yy = yy0 + dx * this.pm.delta4;
        xx = this.mk_rect(this.bdy, this.pm.x6 + dx, yy, this.pm.w, this.pm.h, 'bottom-right');
        results.push(dx += this.pm.w + 3);
      }
      return results;
    };

    Socle_body.prototype.mk_rect = function(bdy_grp, x, y, w, h, pos) {
      var b, s;
      b = this.gm.add.bitmapData(w, h);
      b.ctx.beginPath();
      b.ctx.rect(0, 0, w, h);
      b.ctx.fillStyle = '#00ffff';
      b.ctx.fill();
      s = bdy_grp.create(x, y, b);
      s.body.immovable = true;
      s.body.moves = false;
      s.alpha = 1;
      s.anchor.setTo(0.5, 0.5);
      s.pos = pos;
      return s;
    };

    return Socle_body;

  })();

}).call(this);


/*  written by apch on 2017-05-07 : Jeu */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.YourGame = (function(superClass) {
    extend(YourGame, superClass);

    function YourGame() {
      return YourGame.__super__.constructor.apply(this, arguments);
    }

    YourGame.prototype.update = function() {
      YourGame.__super__.update.call(this);
      if (this.buttonO.pm.game_started) {
        this.basketsO.move();
      }
      if (this.buttonO.pm.game_started) {
        this.diamondsO.check_diamonds();
      }
      this.diamondsO.collide_baskets(this.bskts);
      this.diamondsO.collide_socle(this.scl);
      return this.diamondsO.collide_itself();
    };

    YourGame.prototype.resetPlayer = function() {
      return console.log("Reset the player");
    };

    YourGame.prototype.create = function() {
      YourGame.__super__.create.call(this);
      this.soleO = new Phacker.Game.Socle(this.game);
      this.basketsO = new Phacker.Game.Baskets(this.game);
      this.bskts = this.basketsO.bsk_bdy_grp;
      this.diamondsO = new Phacker.Game.Diamonds(this.game);
      this.dmds = this.diamondsO.grp0;
      this.buttonO = new Phacker.Game.Button(this.game, this.basketsO, this.diamondsO);
      this.socle_bodyO = new Phacker.Game.Socle_body(this.game);
      this.scl = this.socle_bodyO.bdy;
      return this.gateO = new Phacker.Game.Gate(this.game, this.scl);
    };


    /* LOGIC OF YOUR GAME
     * Examples buttons actions
     *
    lostBtn = @game.add.text(0, 0, "Bad Action");
    lostBtn.inputEnabled = true;
    lostBtn.y = @game.height*0.5 - lostBtn.height*0.5
    lostBtn.events.onInputDown.add ( ->
        @lost()
    ).bind @
    
    winBtn = @game.add.text(0, 0, "Good Action");
    winBtn.inputEnabled = true;
    winBtn.y = @game.height*0.5 - winBtn.height*0.5
    winBtn.x = @game.width - winBtn.width
    winBtn.events.onInputDown.add ( ->
        @win()
    ).bind @
    
    lostLifeBtn = @game.add.text(0, 0, "Lost Life");
    lostLifeBtn.inputEnabled = true;
    lostLifeBtn.y = @game.height*0.5 - lostLifeBtn.height*0.5
    lostLifeBtn.x = @game.width*0.5 - lostLifeBtn.width*0.5
    lostLifeBtn.events.onInputDown.add ( ->
        @lostLife()
    ).bind @
    
    bonusBtn = @game.add.text(0, 0, "Bonus");
    bonusBtn.inputEnabled = true;
    bonusBtn.y = @game.height*0.5 - bonusBtn.height*0.5 + 50
    bonusBtn.x = @game.width - bonusBtn.width
    bonusBtn.events.onInputDown.add ( ->
        @winBonus()
    ).bind @
    
    #Placement specific for mobile
    
    if @game.gameOptions.fullscreen
        lostBtn.x = @game.width*0.5 - lostBtn.width*0.5
        lostBtn.y = @game.height*0.25
    
        winBtn.x = @game.width*0.5 - winBtn.width*0.5
        winBtn.y = @game.height*0.5
    
        lostLifeBtn.x = @game.width*0.5 - lostLifeBtn.width*0.5
        lostLifeBtn.y = @game.height*0.75
    
        bonusBtn.x = @game.width*0.5 - winBtn.width*0.5
        bonusBtn.y = @game.height*0.5 + 50
     */

    return YourGame;

  })(Phacker.GameState);

}).call(this);
