
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
        xrot1: this.Pm.rop.x0 - this.Pm.rop.w / 3,
        xrot2: this.Pm.rop.x0 + this.Pm.rop.w / 6,
        w: 42,
        h: 54,
        vx: 100,
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
        } else if (this.bsk.down && this.gm.math.fuzzyEqual(this.bsk.x, this.pm.xrot2, 4)) {
          this.bsk.down = false;
          this.twn_up_down(0);
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
      return bkO.real_body = this.bbO.mk_body(this.bsk_bdy_grp, bkO);
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
        b.real_body.lft.x = b.bsk.x - b.bsk.body.width / 2 + 6;
        b.real_body.lft.y = b.bsk.y;
        b.real_body.rgt.x = b.bsk.x + b.bsk.body.width / 2 - 6;
        b.real_body.rgt.y = b.bsk.y;
        b.real_body.btm.x = b.bsk.x + 1;
        results.push(b.real_body.btm.y = b.bsk.y + b.bsk.body.height / 2 - 3);
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
      h = bkO.pm.h;
      x = bkO.bsk.x;
      y = bkO.bsk.y;
      this.btm = this.mk_rect(bdy_grp, x + 1, y + bkO.pm.h / 2 - 3, w - 12, 4);
      this.lft = this.mk_rect(bdy_grp, x - bkO.pm.w / 2 + 10, y, 4, h);
      this.rgt = this.mk_rect(bdy_grp, x + bkO.pm.w / 2 - 6, y, 4, h);
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
      b.ctx.fillStyle = '#ff0000';
      b.ctx.fill();
      s = bdy_grp.create(x, y, b);
      s.body.immovable = true;
      s.body.moves = false;
      s.alpha = 1;
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
        n: 100,
        msg_bsk: 'not yet'
      };
      this.dmds_grp = this.gm.add.physicsGroup();
      this.dmds_grp.enableBody = true;
      this.one_dmds_grp(549, 50, 'blue_ball');
      this.one_dmds_grp(549, 60, 'pink_ball');
      this.one_dmds_grp(549, 70, 'green_ball');
    }

    Diamonds.prototype.one_dmds_grp = function(x, y, bll) {
      var dmd;
      dmd = this.dmds_grp.create(x, y, bll);
      dmd.body.bounce.y = 0;
      return dmd.body.bounce.x = .4;
    };

    Diamonds.prototype.collide_baskets = function(bsk) {
      if (this.gm.physics.arcade.collide(this.dmds_grp, bsk, function() {
        return true;
      }, function(dmd, bsk) {
        return this.when_collide_bsk(dmd, bsk);
      }, this)) {
        return this.pm.mes_bsk;
      }
      return 'no';
    };

    Diamonds.prototype.when_collide_bsk = function(dmd, bsk) {
      return true;
    };

    Diamonds.prototype.collide_himself = function() {
      if (this.gm.physics.arcade.collide(this.dmds_grp, this.dmds_grp, function() {
        return true;
      }, function(d1, d2) {
        return this.when_collide_bsk(d1, d2);
      }, this)) {
        return this.pm.mes_bsk;
      }
      return 'no';
    };

    Diamonds.prototype.when_collide_bsk = function(d1, d2) {
      d1.body.velocity.x = 20;
      d2.body.velocity.x = -20;
      return true;
    };

    return Diamonds;

  })();

}).call(this);


/*  written by apch  on 2017-05-09 */

(function() {
  Phacker.Game.Button = (function() {
    function Button(gm, bskO, dmd) {
      this.gm = gm;
      this.bskO = bskO;
      this.dmd = dmd;
      this._fle_ = 'Button';
      this.pm = this.gm.parameters.btn = {
        x: this.gm.parameters.mec.x0 - 35,
        y: this.gm.parameters.mec.y0 + 180,
        w: 72,
        h: 72,
        start: false
      };
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
      this.dmd.getAt(0).body.gravity.y = 250;
      this.dmd.getAt(0).body.velocity.x = 100;
      this.dmd.getAt(1).body.gravity.y = 250;
      this.dmd.getAt(1).body.velocity.x = 200;
      this.dmd.getAt(2).body.gravity.y = 240;
      return this.dmd.getAt(2).body.velocity.x = 150;
    };

    return Button;

  })();

}).call(this);

(function() {
  Phacker.Game.Input = (function() {
    function Input(gm) {
      this.gm = gm;
      this._fle_ = 'Input';
      this.Pm = this.gm.parameters;
      this.Pm.mouse_down = false;
      this.gm.input.onDown.add(this.on_mouse_down, this);
      this.gm.input.onUp.add(this.on_mouse_up, this);
    }

    Input.prototype.on_mouse_down = function() {
      if (!this.Pm.btn.start) {
        return;
      }
      return this.Pm.mouse_down = true;
    };

    Input.prototype.on_mouse_up = function() {
      if (!this.Pm.btn.start) {
        return;
      }
      return this.Pm.mouse_down = false;
    };

    return Input;

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
      if (this.buttonO.pm.start) {
        this.basketsO.move();
      }
      this.diamondsO.collide_baskets(this.bskts);
      return this.diamondsO.collide_himself();
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
      this.dmds = this.diamondsO.dmds_grp;
      this.buttonO = new Phacker.Game.Button(this.game, this.basketsO, this.diamondsO.dmds_grp);
      return this.inputO = new Phacker.Game.Input(this.game);
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
