var joy_stick = require("joy_stick");
cc.Class({
    extends: cc.Component,

    properties: {
        stick : {
            default : null,
            type : joy_stick
        },
        speed : 500
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if (this.stick.dir.mag() < 0.5) {
            return;
        }

        var vx = this.stick.dir.x * this.speed;
        var vy = this.stick.dir.y * this.speed;

        this.node.x += vx * dt;
        this.node.y += vy * dt;

        // Math.atan2(y,x) 计算出来的结果angel是一个弧度值 数学的弧度是逆时针的 而游戏中是顺时针的
        var angel = Math.atan2(this.stick.dir.y, this.stick.dir.x);
        var degree = angel* 180 / Math.PI;
        degree = 360 - degree + 90;

        this.node.rotation = degree;
    },
});