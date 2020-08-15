cc.Class({
    extends: cc.Component,

    start () {
        
    },

    updateGround(points) {
        var list = cc.BezierUtils.CalcCurvePoint(points);
        this._points = cc.BezierUtils.CalcPoints(list);
        var chain = this.getComponent(cc.PhysicsChainCollider);
        chain.points = this._points;
        chain.apply();
    },
});
