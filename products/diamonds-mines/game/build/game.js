
/*  written by apch on 2017-05-06
       ... --- ...
      |          ,---------------------------------.
      |.===.     | an other one : diamonds_mines   |
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

(function() {
  Phacker.Game.OneBasket = (function() {
    function OneBasket(gm) {
      this.gm = gm;
      this._fle_ = 'One bsk';
      this.Pm = this.gm.parameters;
      this.pm = this.Pm.bsk = {
        w: 42,
        h: 54,
        x1: this.Pm.rop.x0 - this.Pm.rop.w / 2 + 2,
        y1: this.gm.parameters.rop.y0 + 2,
        x2: this.Pm.rop.x0 + this.Pm.rop.w / 2 - 2,
        y2: this.gm.parameters.rop.y0 + 2,
        x3: this.Pm.rop.x0 + this.Pm.rop.w / 2 - 2,
        y3: this.gm.parameters.rop.y0 + this.Pm.rop.h - 2,
        x4: this.Pm.rop.x0 - this.Pm.rop.w / 2 + 2,
        y4: this.gm.parameters.rop.y0 + this.Pm.rop.h - 2,
        vx: 100
      };
      this.mk_bsk(this.pm.x1, this.pm.y1, 'N');
      this.move();
    }

    OneBasket.prototype.mk_bsk = function(x, y, branch) {
      this.bsk = this.gm.add.sprite(x, y, 'blue_basket');
      this.gm.physics.arcade.enable(this.bsk, Phaser.Physics.ARCADE);
      this.bsk.anchor.setTo(0.5, 0.5);
      this.bsk.branch = branch;
      if (this.bsk.branch === 'N') {
        this.bsk.body.velocity.x = this.pm.vx;
        return this.bsk.body.velocity.y = 0;
      } else if (this.bsk.branch === 'E') {
        this.bsk.body.velocity.x = 0;
        return this.bsk.body.velocity.y = this.pm.vx;
      } else if (this.bsk.branch === 'S') {
        this.bsk.body.velocity.x = -this.pm.vx;
        return this.bsk.body.velocity.y = 0;
      } else if (this.bsk.branch === 'O') {
        this.bsk.body.velocity.x = 0;
        return this.bsk.body.velocity.y = this.pm.vx;
      }
    };

    OneBasket.prototype.move = function() {
      if (this.bsk.branch === 'N' && this.bsk.x > this.pm.x2) {
        this.bsk.body.velocity.x = 0;
        this.bsk.body.velocity.y = this.pm.vx;
        return this.bsk.branch = 'E';
      } else if (this.bsk.branch === 'E' && this.bsk.y > this.pm.y3) {
        this.bsk.body.velocity.x = -this.pm.vx;
        this.bsk.body.velocity.y = 0;
        return this.bsk.branch = 'S';
      } else if (this.bsk.branch === 'S' && this.bsk.x < this.pm.x4) {
        this.bsk.body.velocity.x = 0;
        this.bsk.body.velocity.y = -this.pm.vx;
        return this.bsk.branch = 'O';
      } else if (this.bsk.branch === 'O' && this.bsk.y < this.pm.y1) {
        this.bsk.body.velocity.x = this.pm.vx;
        this.bsk.body.velocity.y = 0;
        return this.bsk.branch = 'N';
      }
    };

    return OneBasket;

  })();

}).call(this);

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
      return this.one_bskO.move();
    };

    YourGame.prototype.resetPlayer = function() {
      return console.log("Reset the player");
    };

    YourGame.prototype.create = function() {
      YourGame.__super__.create.call(this);
      this.soleO = new Phacker.Game.Socle(this.game);
      return this.one_bskO = new Phacker.Game.OneBasket(this.game);
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

}).call(this);
