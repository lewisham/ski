(function() {
    var ConfigCls = cc.Class({
        ctor(points){
            this._startPos = points[0];
            this._endPos = points[points.length - 1];
            this._points = points;
        },

        getPoints() {
            var list = [];
            for (var i = 0; i < this._points.length; i++) {
                list.push(cc.v2(this._points[i].x, this._points[i].y));
            }
            return list;
        }
    });

    var TerrainConfigCls = cc.Class({
        ctor(points){
            this._map = {};
            this._count = 0;
            this.addItem([cc.v2(0, 400), cc.v2(600, 300), cc.v2(1000, 0)]);
            this.addItem([cc.v2(0, 400), cc.v2(500, 200), cc.v2(1280, 0)]);
            this.addItem([cc.v2(0, 500), cc.v2(300, 400), cc.v2(500, 0)]);
            this.addItem([cc.v2(0, 300), cc.v2(300, 100), cc.v2(1280, 0)]);
            this.addItem([cc.v2(0, 300), cc.v2(500, 250), cc.v2(1280, 100)]);
            this.addItem([cc.v2(0, 200), cc.v2(300, 250), cc.v2(1280, 100)]);
            this.addItem([cc.v2(0, 400), cc.v2(600, 300), cc.v2(1000, 0)]);
        },

        addItem(points) {
            var id = this._count;
            this._map[id] = new ConfigCls(points);
            this._count++;
        },

        get(id) {
            return this._map[id];
        },

        getLast () {
            return this._map[this._count - 1];
        },

        getRandom() {
            var id = Math.floor(Math.random(0, 1) * this._count);
            return this._map[id];
        }
    });

    cc.TerrainConfig = new TerrainConfigCls();
})();