cc.Class({
    extends: cc.Component,

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        var flags = 0;
        //flags += cc.PhysicsManager.DrawBits.e_aabbBit;
        flags += cc.PhysicsManager.DrawBits.e_pairBit;
        flags += cc.PhysicsManager.DrawBits.e_centerOfMassBit;
        flags += cc.PhysicsManager.DrawBits.e_jointBit;
        flags += cc.PhysicsManager.DrawBits.e_shapeBit;
        cc.director.getPhysicsManager().debugDrawFlags = flags;

        this.ground = cc.find("Ground").getComponent("Ground");
        this.ground.updateGround([cc.v2(100, 400), cc.v2(600, 300), cc.v2(1000, 0)]);
    },

    // update (dt) {},
});
