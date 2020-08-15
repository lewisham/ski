(function() {
    var BezierPoint = cc.Class({
        // p1 起始点 c1 控制点1 c2 控制点2 p2终点
        ctor(p1, c1, c2, p2){
            this.p1 = p1;
            this.c1 = c1;
            this.c2 = c2;
            this.p2 = p2;
        },

        // 0.0 >= t <= 1.0
        getPointAtTime(t) {
            var t1 = Math.pow(1 - t, 3);
            var t2 = 3 * t * (Math.pow(1 - t, 2));
            var t3 = 3 * Math.pow(t, 2) * (1 - t);
            var t4 = Math.pow(t, 3);
            var x = t1 * this.p1.x + t2 * this.c1.x + t3 * this.c2.x + t4 * this.p2.x;
            var y = t1 * this.p1.y + t2 * this.c1.y + t3 * this.c2.y + t4 * this.p2.y;
            return cc.v2(x, y);
        },
    });

    var BezierUtils = {}
    cc.BezierUtils = BezierUtils;
    BezierUtils.CalcCurvePoint = function(originPoints, scale) {
        if (originPoints.length > 2) {
            var s1 = originPoints[0];
            var s2 = originPoints[originPoints.length - 1];
            originPoints.unshift(s1);
            originPoints.push(s2);
        }
        scale = scale || 0.6;
        var midpoints = [];
        var originCount = originPoints.length;
        for (var i = 0; i < originCount; i++) {
            var next = (i + 1) % originCount;
            midpoints.push(cc.v2((originPoints[i].x + originPoints[next].x) / 2, (originPoints[i].y + originPoints[next].y) / 2));
        }
        var extrapoints = [];
        for (var i = 0; i < 2 * originCount; i++) {
            extrapoints.push(cc.v2(0, 0));
        }

        for (var i = 0; i < originCount; i++) {
            var next = (i + 1) % originCount;
            var back = (i + originCount - 1) % originCount;
            var midInMid = cc.v2((midpoints[i].x + midpoints[back].x) / 2, (midpoints[i].y + midpoints[back].y) / 2);
            var offsetx = originPoints[i].x - midInMid.x;
            var offsety = originPoints[i].y - midInMid.y;
            var ext1 = extrapoints[2 * i];
            ext1.x = midpoints[back].x + offsetx;
            ext1.y = midpoints[back].y + offsety;
            var addx = (ext1.x - originPoints[i].x) * scale;
            var addy = (ext1.y - originPoints[i].y) * scale;
            ext1.x = originPoints[i].x + addx;
            ext1.y = originPoints[i].y + addy;
            extrapoints[2 * i] = ext1;

            var ext2 = extrapoints[(2 * i + 1) % (2 * originCount)];
            ext2.x = midpoints[i].x + offsetx;
            ext2.y = midpoints[i].y + offsety;

            addx = (ext2.x - originPoints[i].x) * scale;
            addy = (ext2.y - originPoints[i].y) * scale;
            ext2.x = originPoints[i].x + addx;
            ext2.y = originPoints[i].y + addy;
            extrapoints[(2 * i + 1) % (2 * originCount)] = ext2;
        }

        var bezierPoints = [];
        for (var i = 1; i < originCount - 2; i++) {
            var extraindex = 2 * i;
            var extranexti = (extraindex + 2) % (2 * originCount);
            var nexti = (i + 1) % originCount;
            var p = new BezierPoint(originPoints[i], extrapoints[extraindex + 1], extrapoints[extranexti], originPoints[nexti]);
            bezierPoints.push(p);
        }
        return bezierPoints;
    }

    BezierUtils.CalcPoints = function(bezierPoints) {
        var points = [];
        var count = bezierPoints.length;
        for (var i = 0; i < count; i++) {
            for (var t = 0; t <= 1; t += 0.025) {
                points.push(bezierPoints[i].getPointAtTime(t));
            }
        }
        return points;
    }


})();