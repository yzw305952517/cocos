// 摇杆代码 joy_stick.js

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        stick:{
            type: cc.Node,
            default: null
        },
        max_r : 120
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.start_pos = cc.v2(0, 0);
        this.stick.setPosition(this.start_pos);

        this.dir = cc.v2(0, 0);

        this.stick.on(cc.Node.EventType.TOUCH_START, function(){

        }.bind(this), this);

        this.stick.on(cc.Node.EventType.TOUCH_MOVE, function(e){
            var w_pos = e.getLocation();
            //把一个世界坐标系的点，转换到某个节点下到坐标，原点在node到中心
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            //返回一个向量的长度平方
            var len = pos.mag();

            /* 好处
            @example 
		```js
		var v = cc.v2(10, 10);
		v.mag(); // return 14.142135623730951;
		``` 
		*/
		//mag(): number;		
		/**
		!#en Returns the squared length of this vector.
		!#zh 返回该向量的长度平方。
            归一化，一个方向，只有一个值;
            this.dir.x = cos(r);
            this.dir.y = sin(r);
            // -1, 1
            */
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;



            if(len > this.max_r){
                // 三角函数或者比例关系算坐标
                pos.x = pos.x * this.max_r / len;
                pos.y = pos.y * this.max_r / len;
            }
            this.stick.setPosition(pos);

        }.bind(this), this);

        this.stick.on(cc.Node.EventType.TOUCH_END, function(){
            this.dir = cc.v2(0, 0);
            this.stick.setPosition(this.start_pos);
        }.bind(this), this);

        this.stick.on(cc.Node.EventType.TOUCH_CANCEL, function(){
            this.dir = cc.v2(0, 0);
            this.stick.setPosition(this.start_pos);
        }.bind(this), this);
    },

    start () {

    },

    // update (dt) {},
});
