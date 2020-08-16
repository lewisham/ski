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
        this.ground.updateConfig(cc.TerrainConfig.getLast());
        this.ground.generateShape();
    },

    // update (dt) {},
});
