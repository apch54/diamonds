
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
        y0: 48,
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
      this.pm.rop.y0 = (this.pm.btm.y0 - this.pm.rop.h) / 2 + 10;
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

    Socle.prototype.add_heart = function() {
      var heartImg, lastElement;
      lastElement = this.gm.ge.heart[0];
      heartImg = this.gm.add.image(0, 0, 'heart');
      heartImg.x = lastElement.x + lastElement.width + 5;
      heartImg.y = lastElement.y;
      heartImg.fixedToCamera = true;
      return this.gm.ge.heart.push(heartImg);
    };

    return Socle;

  })();

}).call(this);


/*  written by apch on 2017-05-07 */

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
        vx: this.Pm.bsks.v,
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


/*  written by apch on 2017-05-07 */

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
        y3: this.gm.parameters.rop.y0 + this.Pm.rop.h - 10,
        x4: this.Pm.rop.x0 - this.Pm.rop.w / 2 + 2,
        y4: this.gm.parameters.rop.y0 + this.Pm.rop.h - 2,
        n: 6,
        v: this.gm.gameOptions.vx0
      };
      this.pm.bsk_remaining = this.pm.n;
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
      var b, i, l, len, li, ref;
      if ((l = this.bska.length) < this.pm.n) {
        b = this.bska[l - 1].bsk;
        li = 2 * (this.Pm.rop.w + this.Pm.rop.h) / this.pm.n;
        if (this.gm.math.fuzzyEqual(b.y - this.pm.y2, li, 4)) {
          this.mk_bsk();
        }
      }
      ref = this.bska;
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
        b.bsk.real_body.btm.branch = b.bsk.branch;
        if (b.bsk.branch === 'W') {
          if (!b.bsk.real_body.btm.full && !b.bsk.real_body.btm.out) {
            b.bsk.real_body.btm.out = true;
            this.twn_away(b.bsk);
            this.pm.bsk_remaining--;
          }
        } else if (b.bsk.branch === 'E') {
          b.bsk.real_body.btm.full = false;
          b.bsk.real_body.btm["in"].n = 0;
        }
      }
      return this.pm.bsk_remaining;
    };

    Baskets.prototype.twn_away = function(bsk) {
      var tw;
      tw = this.gm.add.tween(bsk);
      tw.to({
        x: bsk.x - 200,
        y: bsk.y + 270,
        alpha: 0
      }, 1500, Phaser.Easing.Linear.None, true, 0, 0);
      return tw.onComplete.add(function() {
        bsk.real_body.btm.body.enable = false;
        bsk.real_body.lft.body.enable = false;
        return bsk.real_body.rgt.body.enable = false;
      }, this);
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
      this.btm.full = false;
      this.btm.out = false;
      this.btm["in"] = {
        n: 0
      };
      this.lft = this.mk_rect(bdy_grp, x - bkO.pm.w / 2 + 2, y + 5, 5, h);
      this.lft.typ = 'lft';
      this.lft["in"] = this.btm["in"];
      this.rgt = this.mk_rect(bdy_grp, x + bkO.pm.w / 2 - 3, y + 5, 5, h);
      this.rgt.typ = 'rgt';
      this.rgt["in"] = this.btm["in"];
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
    function Diamonds(gm, effO, bonusO) {
      this.gm = gm;
      this.effO = effO;
      this.bonusO = bonusO;
      this._fle_ = 'Diamonds';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.dmds = {
        w: 10,
        h: 10,
        n: 97,
        dmd_in_game: 20,
        vx0: 70,
        vx1: 1,
        msg_bsks: [],
        msg_scl: 'mes scl',
        msg_itself: 'mes itself',
        names: ['blue_ball', 'green_ball', 'pink_ball', 'red_ball', 'yellow_ball'],
        x1: this.Pm.mec.x0 - this.Pm.mec.w / 2 + 5,
        x2: this.Pm.mec.x0 - 20,
        x3: this.Pm.mec.x0 + this.Pm.mec.w / 2 - 56,
        y1: this.Pm.mec.y0 + 65,
        escX: this.gm.gameOptions.fullscreen ? 50 : 100,
        bounce: {
          x: .2,
          y: .05
        },
        g: this.gm.gameOptions.gravityY,
        last_transfert_date: 0,
        dt: 250,
        used: 0,
        dead: 0,
        n_diamonds_for_bonus: this.gm.gameOptions.n_diamonds_for_bonus
      };
      console.log(this._fle_, ': ', this.pm.n_diamonds_for_bonus);
      this.grp0 = this.gm.add.physicsGroup();
      this.grp0.enableBody = true;
      this.grp1 = this.gm.add.physicsGroup();
      this.grp1.enableBody = true;
      this.init();
    }

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
      dmd.has_scored = false;
      switch (scl.pos) {
        case 'hight-left':
          if (this.pm.x2 - dmd.x > 40) {
            dmd.body.velocity.x = this.pm.vx0;
            dmd.y -= 1;
          } else {
            dmd.body.velocity.x = this.pm.vx0 / 2;
            dmd.y -= .1;
          }
          break;
        case 'hight-right':
          if (dmd.x - this.pm.x3 > 40) {
            dmd.body.velocity.x = -this.pm.vx0 / 2;
          } else {
            dmd.body.velocity.x = -this.pm.vx0;
            dmd.y -= .1;
          }
          break;
        case 'middle-left':
          dmd.x += .1;
          break;
        case 'middle-right':
          dmd.x -= .1;
          break;
        case 'bottom-left':
          dmd.y = scl.y - 25;
          this.effO.play(dmd);
          this.twn_dmd(dmd, this.pm.escX, scl.y - 15, 500);
          if (!dmd.dead) {
            this.pm.dead++;
            dmd.dead = true;
          }
          break;
        case 'bottom-right':
          dmd.y = scl.y - 30;
          this.effO.play(dmd);
          this.twn_dmd(dmd, this.Pm.bg.w - this.pm.escX, scl.y - 15, 500);
          if (!dmd.dead) {
            this.pm.dead++;
            dmd.dead = true;
          }
          break;
        case 'gate':
          if (scl.body.touching.left) {
            dmd.y += 20;
          } else {
            dmd.y = scl.y - this.pm.h;
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
        return this.last_msg_bsk();
      }
      return 'no';
    };

    Diamonds.prototype.when_collide_bsk = function(dmd, bsk) {
      var ref, ref1;
      if (!dmd.has_scored) {
        bsk["in"].n++;
        if (bsk["in"].n === this.pm.n_diamonds_for_bonus && this.gm.ge.score > 30) {
          this.pm.msg_bsks.push('bonus');
          this.bonusO.draw_bonus(bsk);
        } else {
          this.pm.msg_bsks.push('win_bsk');
          this.effO.play(dmd, 3);
        }
      }
      dmd.has_scored = true;
      if (bsk.typ === 'lft') {
        if ((-10 < (ref = bsk.y - dmd.y - bsk.body.height / 2) && ref < 10)) {
          this.twn_move(dmd, dmd.x + 20, dmd.y + 30);
        } else {
          dmd.x += 1.5;
        }
      } else if (bsk.typ === 'rgt') {
        if ((-10 < (ref1 = bsk.y - dmd.y - bsk.body.height / 2) && ref1 < 10)) {
          this.twn_move(dmd, dmd.x - 20, dmd.y + 30);
        } else {
          dmd.x -= 1.5;
        }
      } else if (bsk.typ === 'btm') {
        dmd.body.velocity.y = 0;
        dmd.y = bsk.y - 13;
        bsk.full = true;
      }
      return true;
    };

    Diamonds.prototype.collide_itself = function() {
      this.grp0.setAll('body.immovable', true);
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
      this.grp0.setAll('body.immovable', false);
      if (d1.x < d2.x) {
        if (!d1.body.touching.up) {
          d1.body.velocity.x -= this.pm.vx1;
        }
        if (!d2.body.touching.up) {
          d2.body.velocity.x += this.pm.vx1;
        }
        d1.body.velocity.y /= 1.5;
      } else {
        if (!d1.body.touching.up) {
          d1.body.velocity.x -= this.pm.vx1;
        }
      }
      return true;
    };

    Diamonds.prototype.twn_move = function(dmd, x0, y0) {
      this.go_center = this.gm.add.tween(dmd);
      return this.go_center.to({
        x: x0,
        y: y0
      }, 200, Phaser.Easing.Cubic.Out, true);
    };

    Diamonds.prototype.twn_dmd = function(dmd, x0, y0, t0) {
      var tw;
      if (t0 == null) {
        t0 = 1100;
      }
      tw = this.gm.add.tween(dmd);
      tw.to({
        x: x0,
        y: y0,
        alpha: 0
      }, t0, Phaser.Easing.Linear.None, true, 0, 0);
      return tw.onComplete.add(function() {
        return this.grp0.remove(dmd);
      }, this);
    };

    Diamonds.prototype.check_diamonds = function() {
      if (this.grp1.length < 1) {
        return this.pm.dead;
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
            if (this.grp1.length > 15) {
              this.dmd_transfert(15);
            }
            break;
          case 8:
          case 9:
          case 10:
          case 11:
            if (this.grp1.length > 25) {
              this.dmd_transfert(25);
            }
            break;
          case 12:
          case 13:
          case 14:
          case 15:
            if (this.grp1.length > 35) {
              this.dmd_transfert(35);
            }
            break;
          case 16:
          case 17:
          case 18:
          case 19:
            if (this.grp1.length > 45) {
              this.dmd_transfert(45);
            }
            break;
          case 20:
          case 21:
          case 22:
          case 23:
            if (this.grp1.length > 45) {
              this.dmd_transfert(55);
            }
            break;
          case 24:
          case 25:
          case 26:
          case 27:
            if (this.grp1.length > 65) {
              this.dmd_transfert(65);
            }
            break;
          default:
            this.dmd_transfert(0);
        }
        this.pm.used++;
      }
      return this.pm.dead;
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
      dmd = this.grp0.create(x, y, bll);
      this.gm.physics.arcade.enable(dmd, Phaser.Physics.ARCADE);
      return d0.body.setCircle(5);
    };

    Diamonds.prototype.dmd_transfert = function(n) {
      var d0, d1;
      d1 = this.grp1.getAt(n);
      d0 = this.grp0.create(d1.x, d1.y, d1.frame2);
      d0.body.gravity.y = this.pm.g;
      d0.body.bounce.y = 0;
      d0.body.bounce.x = 0;
      d0.dead = false;
      d0.has_scored = false;
      d1.destroy();
      return d0;
    };

    Diamonds.prototype.last_msg_bsk = function() {
      if (this.pm.msg_bsks.length === 0) {
        return 'no msg';
      } else {
        return this.pm.msg_bsks.pop();
      }
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
    function Gate(gm, sclO) {
      this.gm = gm;
      this.sclO = sclO;
      this._fle_ = 'Gate';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.gate = {
        x0: this.Pm.mec.x0 - 14,
        y0: this.Pm.mec.y0 + 148,
        w: 14,
        h: 5
      };
      this.Pm.mouse_down = false;
      this.scl_bdy = this.sclO.bdy;
      this.gm.input.onDown.add(this.on_mouse_down, this);
      this.gm.input.onUp.add(this.on_mouse_up, this);
      this.gtl = this.scl_bdy.create(this.pm.x0, this.pm.y0, 'mecanic_door_left');
      this.gtl.anchor.setTo(0, 0.5);
      this.gtl.body.immovable = true;
      this.gtl.body.moves = false;
      this.gtl.pos = 'gate';
      this.gtr = this.scl_bdy.create(this.pm.x0 + 28, this.pm.y0, 'mecanic_door_right');
      this.gtr.anchor.setTo(1, 0.5);
      this.gtr.body.immovable = true;
      this.gtr.body.moves = false;
      this.gtr.pos = 'gate';
      this.rect = this.mk_rect(this.scl_bdy, this.pm.x0 - this.pm.w, this.pm.y0, this.pm.w * 4, 20, 'gate');
      this.rect.body.immovable = true;
    }

    Gate.prototype.on_mouse_down = function() {
      if (!this.Pm.btn.start) {
        return;
      }
      this.Pm.mouse_down = true;
      this.gtl.body.enable = false;
      this.gtr.body.enable = false;
      this.rect.body.enable = false;
      this.twn_close_open(this.gtl, 90);
      this.twn_close_open(this.gtr, -90);
      return this.twn_close_open_rect(this.rect, this.pm.x0 + 30);
    };

    Gate.prototype.on_mouse_up = function() {
      if (!this.Pm.btn.start) {
        return;
      }
      this.gtl.body.enable = true;
      this.gtr.body.enable = true;
      this.rect.body.enable = true;
      this.Pm.mouse_down = false;
      this.twn_close_open(this.gtl, 0);
      this.twn_close_open(this.gtr, 0);
      return this.twn_close_open_rect(this.rect, this.pm.x0 - 14);
    };

    Gate.prototype.twn_close_open = function(gt, a0) {
      this.gt_move = this.gm.add.tween(gt);
      return this.gt_move.to({
        angle: a0
      }, 200, Phaser.Easing.Linear.None, true);
    };

    Gate.prototype.twn_close_open_rect = function(gt, x0) {
      this.gt_move = this.gm.add.tween(gt);
      return this.gt_move.to({
        x: x0
      }, 200, Phaser.Easing.Linear.None, true);
    };

    Gate.prototype.mk_rect = function(bdy_grp, x, y, w, h, pos) {
      var b, s;
      b = this.gm.add.bitmapData(w, h);
      b.ctx.beginPath();
      b.ctx.rect(0, 0, w, h);
      b.ctx.fillStyle = '#00ffff';
      b.ctx.fill();
      s = bdy_grp.create(x, y, b);
      s.body.immovable = true;
      s.body.moves = false;
      s.alpha = 0;
      s.pos = pos;
      return s;
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
        h: 20,
        x1: this.Pm.dmds.x1 + 5,
        y1: this.Pm.dmds.y1 + 35,
        x2: this.Pm.dmds.x2 + 2,
        y2: this.Pm.dmds.y1 + 65,
        x3: this.Pm.dmds.x2 + 40,
        x4: this.Pm.dmds.x3 + 60,
        x5: this.Pm.btm.x0 - this.Pm.btm.w / 2,
        y5: this.Pm.btm.y0 + 30,
        x6: this.Pm.btm.x0,
        y6: this.Pm.btm.y0 + 13,
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
        dx += this.pm.w - 5;
      }
      this.last = this.mk_rect(this.bdy, this.pm.x2, this.pm.y2 + 21, this.pm.w, this.pm.h + 25, 'middle-left');
      return this.last1 = this.mk_rect(this.bdy, this.pm.x2, this.pm.y2 - 5, this.pm.w, 6, 'hight-left2');
    };

    Socle_body.prototype.mk_right = function() {
      var dx, results, yy, yy0;
      this.mk_rect(this.bdy, this.pm.x3 - 6, this.last1.y, this.pm.w, 6, 'hight-right2');
      this.mk_rect(this.bdy, this.pm.x3 - 6, this.last.y, this.pm.w, this.pm.h + 25, 'middle-right');
      dx = 6;
      yy0 = this.pm.y3 - this.pm.h;
      results = [];
      while (dx < this.pm.x4 - this.pm.x3) {
        yy = yy0 + dx * this.pm.delta2;
        this.mk_rect(this.bdy, this.pm.x3 - 6 + dx, yy, this.pm.w, this.pm.h, 'hight-right');
        results.push(dx += this.pm.w - 5);
      }
      return results;
    };

    Socle_body.prototype.mk_btm_left = function() {
      var dx, yy;
      dx = 0;
      while (dx < this.pm.x6 - this.pm.x5) {
        yy = this.pm.y5 + dx * this.pm.delta3;
        this.mk_rect(this.bdy, this.pm.x5 + dx, yy, this.pm.w, this.pm.h, 'bottom-left');
        dx += this.pm.w;
      }
      return this.last = this.mk_rect(this.bdy, this.pm.x6, this.pm.y6, this.pm.w, this.pm.h, 'bottom-left');
    };

    Socle_body.prototype.mk_btm_right = function() {
      var dx, results, xx, yy, yy0;
      dx = this.pm.w;
      yy0 = this.last.y;
      results = [];
      while (dx < this.pm.x7 - this.pm.x6) {
        yy = yy0 + dx * this.pm.delta4;
        xx = this.mk_rect(this.bdy, this.pm.x6 + dx, yy, this.pm.w, this.pm.h, 'bottom-right');
        results.push(dx += this.pm.w);
      }
      return results;
    };

    Socle_body.prototype.mk_rect = function(bdy_grp, x, y, w, h, pos) {
      var b, s;
      b = this.gm.add.bitmapData(w, h);
      b.ctx.beginPath();
      b.ctx.rect(0, 0, w, h);
      b.ctx.fillStyle = '#ff00ff';
      b.ctx.fill();
      s = bdy_grp.create(x, y, b);
      s.body.immovable = true;
      s.body.moves = false;
      s.alpha = 0;
      s.anchor.setTo(0.5, 0.5);
      s.pos = pos;
      return s;
    };

    return Socle_body;

  })();

}).call(this);

(function() {
  Phacker.Game.Effects = (function() {
    function Effects(gm) {
      this.gm = gm;
      this._fle_ = 'Effect';
      this.effects = ['effect1', 'effect3', 'effect4', 'effect5'];
      this.last_eff_time = 0;
      this.delay = 250;
    }

    Effects.prototype.play = function(obj, n) {
      var anim, eff, nowt;
      nowt = new Date().getTime();
      if (!(n === 3) && (nowt - this.last_eff_time < this.delay)) {
        return;
      } else if (n !== 3) {
        this.last_eff_time = nowt;
      }
      if (n == null) {
        n = this.gm.rnd.integerInRange(0, 2);
      }
      switch (n) {
        case 0:
        case 1:
          eff = this.gm.add.sprite(50, 100, this.effects[n], 2);
          anim = eff.animations.add('explode', [2, 1, 0, 1], 8, false);
          break;
        case 2:
          eff = this.gm.add.sprite(50, 100, this.effects[n], 4);
          anim = eff.animations.add('explode', [4, 3, 2, 1, 0, 1, 2, 3], 16, false);
          break;
        case 3:
          eff = this.gm.add.sprite(50, 100, this.effects[n], 3);
          anim = eff.animations.add('explode', [3, 2, 1, 0, 1, 2], 12, false);
      }
      eff.anchor.setTo(0.5, 0.5);
      anim.onComplete.add(function() {
        return eff.destroy();
      }, this);
      eff.x = obj.x;
      eff.y = obj.y;
      return eff.animations.play('explode');
    };

    return Effects;

  })();

}).call(this);


/*  written by apch on 2017-05-20 */

(function() {
  Phacker.Game.Rules = (function() {
    function Rules(gm, bsksO) {
      this.gm = gm;
      this.bsksO = bsksO;
      this._fle_ = 'Rules';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.rls = {
        dvx: 20,
        scr: this.gm.ge.score,
        lvl: 0,
        v: this.Pm.bsks.v
      };
    }

    Rules.prototype.check = function() {
      if (this.bsksO.bska.length < 6) {
        return;
      }
      switch (this.pm.lvl) {
        case 0:
          if (this.gm.ge.score < 60) {

          } else {
            this.speedup(this.pm.v + this.pm.dvx);
            return this.pm.lvl = 1;
          }
          break;
        case 1:
          if (this.gm.ge.score < 120) {

          } else {
            this.speedup(this.pm.v + this.pm.dvx * 2);
            return this.pm.lvl = 2;
          }
      }
    };

    Rules.prototype.speedup = function(v0) {
      var b, i, len, ref, results, v;
      ref = this.bsksO.bska;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        b = ref[i];
        v = b.bsk.body.velocity;
        b.pm.vx = v0;
        if (v.x < 0) {
          results.push(v.x = -v0);
        } else if (v.x > 0) {
          results.push(v.x = v0);
        } else if (v.y < 0) {
          results.push(v.y = -v0);
        } else if (v.y > 0) {
          results.push(v.y = v0);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    return Rules;

  })();

}).call(this);


/*  written by apch  on 2017-05-28 */

(function() {
  Phacker.Game.Bonus = (function() {
    function Bonus(gm) {
      this.gm = gm;
      this._fle_ = 'Bonus';
      this.Pm = this.gm.parameters;
    }

    Bonus.prototype.draw_bonus = function(obj) {
      var dx, mvt, style, tw, xx;
      xx = obj.x - 8;
      style = {
        font: "15px Arial",
        fill: "#ffff00",
        align: "center"
      };
      this.text = this.gm.add.text(xx, obj.y - 45, "Bonus", style);
      this.text.anchor.set(0.5);
      this.text.alpha = 1;
      dx = -this.Pm.bsks.v / 7;
      mvt = {
        alpha: [0, 1, 0, 1, 0, 1, 0],
        angle: [0, 0, 0, -20, 20, -20, 360],
        x: [xx + dx, xx + 2 * dx, xx + 3 * dx, xx + 4 * dx, xx + 5 * dx, xx + 6 * dx, xx + 7 * dx]
      };
      tw = this.gm.add.tween(this.text).to(mvt, 1000, "Linear", true);
      return tw.onComplete.add(function() {
        return this.text.destroy();
      }, this);
    };

    return Bonus;

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
      var dead_diamonds, msg, n_bsk;
      this._fle_ = 'Update';
      YourGame.__super__.update.call(this);
      if (this.buttonO.pm.game_started) {
        n_bsk = this.basketsO.move();
      }
      if (n_bsk < this.n_basket) {
        if (n_bsk > 0) {
          if (n_bsk > 0) {
            this.socleO.add_heart();
          }
        }
        this.lostLife();
        this.n_basket = n_bsk;
      }
      if (this.buttonO.pm.game_started) {
        dead_diamonds = this.diamondsO.check_diamonds();
      }
      if (dead_diamonds >= this.diamondsO.pm.n) {
        this.lostLife();
      }
      msg = this.diamondsO.collide_baskets(this.bskts);
      if (msg === 'win_bsk') {
        this.win();
      } else if (msg === 'bonus') {
        this.winBonus();
      }
      this.diamondsO.collide_socle(this.scl);
      this.diamondsO.collide_itself();
      return this.rulesO.check();
    };

    YourGame.prototype.resetPlayer = function() {
      return console.log("Reset");
    };

    YourGame.prototype.create = function() {
      YourGame.__super__.create.call(this);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.socleO = new Phacker.Game.Socle(this.game);
      this.effectO = new Phacker.Game.Effects(this.game);
      this.basketsO = new Phacker.Game.Baskets(this.game);
      this.bskts = this.basketsO.bsk_bdy_grp;
      this.bonusO = new Phacker.Game.Bonus(this.game);
      this.diamondsO = new Phacker.Game.Diamonds(this.game, this.effectO, this.bonusO);
      this.dmds = this.diamondsO.grp0;
      this.buttonO = new Phacker.Game.Button(this.game, this.basketsO, this.diamondsO);
      this.socle_bodyO = new Phacker.Game.Socle_body(this.game);
      this.scl = this.socle_bodyO.bdy;
      this.gateO = new Phacker.Game.Gate(this.game, this.socle_bodyO);
      this.n_basket = this.game.parameters.bsks.n;
      this.rulesO = new Phacker.Game.Rules(this.game, this.basketsO);
      return this.bonusO = new Phacker.Game.Bonus(this.game);
    };

    return YourGame;

  })(Phacker.GameState);


  /* LOGIC OF YOUR GAME
   * Examples buttons actions
   *
  lostBtn = @game.add.text(0, 0, "Bad Action");
  lostBtn.inputEnabled = true;
  lostBtn.y = @game.height*0.5 - lostBtn.height*0.5
  lostBtn.events.onInputDown.add ( ->
      @lost()
  ).bind @
  
  #Placement specific for mobile
  
  if @game.gameOptions.fullscreen
      lostBtn.x = @game.width*0.5 - lostBtn.width*0.5
      lostBtn.y = @game.height*0.25
   */

}).call(this);
