cc.Class({
    extends: cc.Component,

    start () {
        //[cc.v2(0, 400), cc.v2(400, 100), cc.v2(1280, 300)]
        this._grounds = this.node.getComponentsInChildren("Ground");
        this._grounds[0].updateGround([cc.v2(0, 400), cc.v2(200, 300), cc.v2(1280, 0)]);
    },

    update (dt) {
        
    },

    updateTerrain() {

    }
});
