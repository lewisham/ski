cc.Class({
    extends: cc.Component,

    start () {
        this.rigidbody = this.getComponent(cc.RigidBody);
    },

    update (dt) {
        var vec = this.rigidbody.linearVelocity;
        if (vec.x < 300) {
            vec.x = 300;
            this.rigidbody.linearVelocity = vec;
        }
    },
});
