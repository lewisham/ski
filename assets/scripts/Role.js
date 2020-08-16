cc.Class({
    extends: cc.Component,

    start () {
        this.rigidbody = this.getComponent(cc.RigidBody);
    },

    update (dt) {
        var vec = this.rigidbody.linearVelocity;
        if (vec.x < 100) {
            vec.x = 100;
            this.rigidbody.linearVelocity = vec;
        }
    },
});
