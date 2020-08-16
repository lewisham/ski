cc.Class({
    extends: cc.Component,
    start () {
        this.MAX_GROUND = 5;
        this._grounds = this.node.getComponentsInChildren("Ground");
        this._groundIdx = 0;
        this.spawnFirstGround();
        for (var i = 1; i < this.MAX_GROUND; i++) {
            this.spawnGround();
        }
        this.role = cc.find("Role");
    },

    update (dt) {
        var idx = this._groundIdx;
        for (var i = 0; i < this.MAX_GROUND - 1; i++) {
            idx--;
            idx = idx < 0 ? this.MAX_GROUND - 1 : idx;
        }
        var ground = this._grounds[idx];
        var endPos = ground.getEndPos();
        if (this.role.x - endPos.x > 640) {
            this.spawnGround();
        }
    },

    updateTerrain() {

    },

    getConfig() {
        return cc.TerrainConfig.getRandom();
    },

    spawnFirstGround() {
        var ground = this._grounds[this._groundIdx];
        ground.updateConfig(this.getConfig());
        ground.generateShape();
    },

    nextGround() {
        var idx = this._groundIdx + 1;
        if (idx >= this.MAX_GROUND) {
            idx = 0;
        }
        this._groundIdx = idx;
        return idx;
    },

    spawnGround() {
        var currentIdx = this.nextGround();
        cc.log("生成新的地面", currentIdx);
        var lastIdx = currentIdx - 1;
        lastIdx = lastIdx < 0 ? this.MAX_GROUND - 1 : lastIdx;
        var lastGround = this._grounds[lastIdx];
        var endPos = lastGround.getEndPos();
        
        var config = this.getConfig();
        endPos.x -= config._startPos.x;
        endPos.y -= config._startPos.y;

        var ground = this._grounds[currentIdx];
        ground.node.setPosition(endPos)
        ground.updateConfig(config);
        ground.generateShape();
    },
    
});
