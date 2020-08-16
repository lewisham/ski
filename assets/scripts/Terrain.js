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
    },

    update (dt) {
        
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

    spawnGround() {
        this._groundIdx++;
        if (this._groundIdx > this.MAX_GROUND) {
            this._groundIdx = 0;
        }
        cc.log("生成新的地面", this._groundIdx);
        var idx = this._groundIdx - 1;
        idx = idx < 0 ? this.MAX_GROUND : idx;
        var lastGround = this._grounds[idx];
        var endPos = lastGround.getEndPos();
        
        var config = this.getConfig();
        endPos.x -= config._startPos.x;
        endPos.y -= config._startPos.y;

        var ground = this._grounds[this._groundIdx];
        ground.node.setPosition(endPos)
        ground.updateConfig(config);
        ground.generateShape();
    },
    
});
