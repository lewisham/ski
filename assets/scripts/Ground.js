cc.Class({
    extends: cc.Component,

    start () {
        this._config = null;
    },

    updateConfig(config) {
        this._config = config;
        this._points = config.getPoints();;
    },
    
    generateShape() {
        var list = cc.BezierUtils.CalcCurvePoint(this._points);
        this._points = cc.BezierUtils.CalcPoints(list);
        var chain = this.getComponent(cc.PhysicsChainCollider);
        chain.points = this._points;
        chain.apply();
    },

    getConfig() {
        return this._config;
    },

    getEndPos () {
        var pos = this.node.getPosition();
        pos.x += this._config._endPos.x;
        pos.y += this._config._endPos.y;
        return pos;
    },
});
