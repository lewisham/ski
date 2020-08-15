cc.Class({
    extends: cc.Component,

    start () {
        this.camera = cc.find("Canvas/Main Camera");
        this.role = cc.find("Role");
    },

    update (dt) {
        var p =this.role.convertToWorldSpaceAR(cc.v2(0,0));
        p = this.camera.parent.convertToNodeSpaceAR(p);
        this.camera.position = p;
    },
});
