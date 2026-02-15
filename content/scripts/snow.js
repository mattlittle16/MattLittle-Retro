snow = {
    count: 60,
    delay: 20,
    flutter: 0.2,
    wobble: 0.5,
    spin: 1.0,
    wind: 1.0,
    w1: 1,
    minSpeed: 0.3,
    maxSpeed: 4,
    cv: null,
    flakes: [],
    toggle: function () {
        if (window.snowtimer)
            snow.stop();
        else
            snow.start();
    },
    resize: function () {
        snow.cv.width = innerWidth;
        snow.cv.height = innerHeight;
        snow.gt = snow.ct.createLinearGradient(0, 0, 0, snow.cv.height);
        snow.gt.addColorStop(1.0, '#2c3e50');
        snow.gt.addColorStop(1.0, '#2c3e50');
        snow.ct.fillStyle = snow.gt;
    },
    start: function () {
        snow.cv = document.createElement('canvas');
        snow.cv.width = snow.cv.height = 10; // set initial size
        snow.cv.id = 'backgroundSnowCanvas';
        document.body.appendChild(snow.cv);
        snow.createFlake();
        snow.ct = snow.cv.getContext('2d'),
		snow.cv.style.position = 'fixed';
        snow.cv.style.top = 0;
        snow.cv.style.left = 0;
        snow.cv.style.zIndex = -1;
        snow.resize();
        var c = snow.count;
        snow.flakes = [];
        do {
            snow.flakes.push(new snow.flake());
        } while (--c);
        snow.ct.fillRect(0, 0, snow.cv.width, snow.cv.height);
        window.snowtimer = window.setInterval(snow.draw, snow.delay);
        window.addEventListener('resize', snow.resize);
    },
    stop: function () {
        window.clearInterval(window.snowtimer);
        var c = document.getElementById('backgroundSnowCanvas');
        c.parentNode.removeChild(c);
        window.snowtimer = snow = null;
    },
    draw: function () {
        var ct = snow.ct, f = snow.flakes, c = snow.count;
        ct.fillRect(0, 0, snow.cv.width, snow.cv.height);

        do {
            if (f[--c].draw(ct) && ++fdone) { };
        } while (c);
        snow.wind += Math.cos(snow.w1++ / 180.0);
    },
    flake: function () {
        this.draw = function (ct) {
            var x = this.x + snow.wind, y = this.y, cx = x + this.sz / 2, cy = y + this.sz / 2;
            ct.translate(cx, cy);
            ct.rotate(this.a);
            ct.translate(-cx, -cy);
            ct.drawImage(snow.flakeImages[this.flake], x, y, this.sz, this.sz);
            if (this.flakebits >= 0)
                ct.drawImage(snow.flakeBits[this.flakebits], x, y, this.sz, this.sz);
            ct.setTransform(1, 0, 0, 1, 0, 0);
            this.animate();
        };
        this.animate = function () {
            this.y += this.speed;
            this.x += this.flutter * Math.cos(snow.flutter * snow.flutter * this.y);
            this.a = (this.spin * this.y) + (this.wobble * Math.sin(this.y / this.sz));
            if (this.y > innerHeight)
                this.init(1);
        };
        this.init = function (f) {
            this.speed = snow.minSpeed + (Math.random() * (snow.maxSpeed - snow.minSpeed));
            this.sz = ~~(Math.random() * 40) + 20;
            this.flutter = ~~(Math.random() * snow.flutter * (60 - this.sz));
            this.wobble = Math.random() * snow.wobble;
            this.spin = snow.spin * 0.1 * (Math.random() - 0.5);
            this.a = 0;
            this.x = (Math.random() * (innerWidth + this.sz)) - this.sz;
            this.y = f ? -this.sz : Math.random() * innerHeight;
            this.flake = ~~(Math.random() * snow.flakeImages.length);
            this.flakebits = ~~(Math.random() * (snow.flakeBits.length + 1)) - 1;
        };
        this.init();
    },
    createFlake: function () {
        var f, g, c, fi, w, cv = document.createElement('canvas'), bitfunc, bfns;
        cv.width = cv.height = 40;
        snow.flakeImages = [];
        snow.flakeBits = [];

        for (f = 0; f < 6; ++f) {
            snow.flakeImages[f] = fi = cv.cloneNode();
            c = fi.getContext('2d');
            c.fillStyle = '#fff';
            c.translate(20, 20);
            c.beginPath();
            w = 1 + (f / 2);
            c.rect(-w, -20, w * 2, 40);
            c.rotate(Math.PI / 3.0);
            c.rect(-w, -20, w * 2, 40);
            c.rotate(Math.PI / 3.0);
            c.rect(-w, -20, w * 2, 40);
            c.closePath();
            c.fill();
        }
        function ball(c) { c.arc(0, -16, 4, 0, 7, 0); }
        function straightbit(c, w, x, y, z, a) {
            c.moveTo(0, -x);
            c.lineTo(w, -y);
            c.lineTo(w, -z);
            c.lineTo(0, -y - a);
            c.lineTo(-w, -z);
            c.lineTo(-w, -y);
            c.lineTo(0, -x);
        }
        function arm(c) { straightbit(c, 5, 6, 8, 10, 0); }
        function arm2(c) { straightbit(c, 5, 10, 12, 14, 0); }
        function lump(c) { straightbit(c, 4, 6, 8, 12, 2); }
        function fluff(c) { straightbit(c, 9, 6, 8, 11, 0); }
        function bar(c) { straightbit(c, 4, 16, 16, 18, 2); }
        function bar2(c) { straightbit(c, 5, 12, 12, 14, 2); }
        function balllump(c) { ball(c); lump(c); }
        function armlump(c) { arm2(c); lump(c); }
        function twoarm(c) { arm(c); arm2(c); }
        function ballarm(c) { ball(c); arm(c); }
        function twobar(c) { bar(c); bar2(c); }
        function barfluff(c) { bar(c); fluff(c); }
        function barlump(c) { bar(c); lump(c); }
        function bararm(c) { bar(c); arm(c); }
        function bar2arm(c) { bar2(c); arm(c); }
        function bararm2(c) { bar(c); arm2(c); }
        function ballfluff(c) { ball(c); fluff(c); }
        bfns = [ballfluff, bar2arm, bararm2, bararm, barlump, barfluff, bar, bar2,
          twobar, fluff, ball, arm, arm2, lump, balllump, armlump, twoarm, ballarm];

        for (f = 0; f < bfns.length; ++f) {
            snow.flakeBits[f] = fi = cv.cloneNode();
            bitfunc = bfns[f];
            c = fi.getContext('2d');
            c.translate(20, 20);
            c.fillStyle = '#fff';
            for (g = 0; g < 6; ++g) {
                c.beginPath();
                bitfunc(c);
                c.closePath();
                c.fill();
                c.rotate(Math.PI / 3.0);
            }
        }
    },
};