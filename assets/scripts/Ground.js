cc.Class({
    extends: cc.Component,

    start () {
        var list = cc.BezierUtils.CalcCurvePoint([cc.v2(10, 400), cc.v2(400, 100), cc.v2(1100, 300)]);
        this._points = cc.BezierUtils.CalcPoints(list);
        var chain = this.getComponent(cc.PhysicsChainCollider);
        chain.points = this._points;
        chain.apply();
    },

    update (dt) {
        
    },
});
