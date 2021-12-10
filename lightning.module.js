class Vector {
	constructor(x, y) {
		if (x instanceof Vector) {
			this.x = x.x;
			this.y = x.y
		}
		else {
			this.x = x || 0;
			this.y = y || 0;
		}
	}

	distanceTo(vector) {
		return Math.sqrt((vector.x - this.x) ** 2 + (vector.y - this.y) ** 2);
	}

	angle(vector) {
		return Math.atan2(vector.y - this.y, vector.x - this.x);
	}

	clone() {
		return new Vector(this.x, this.y);
	}
}

class Lightning {
	constructor ( p1, p2, options = {}) {
		this.dx = p2.x - p1.x;
		this.dy = p2.y - p1.y;
		this.start = new Vector(p1);
		this.end = new Vector(p2);
		this.points = []
		this.thickness = options.thickness || 4;
		this.times = 0;
		this.angle = this.start.angle(this.end);
		//this.gen();
		this.opacity = 1;
		this.lastTime = performance.now();
		this.fadeTime = options.fadeTime || Infinity; 
		this.fadeTimeout = options.fadeTime != Infinity && typeof options.fadeTime == 'number' && typeof options.onDone === 'function'? setTimeout(options.onDone, options.fadeTime) : 0;
		this.range = 50;
		this.stepLength = options.stepLength || 4;
		this.changeRate = options.changeRate || 4;
		this.newGen();
	}

	newGen() {
		const range = this.range, distance = this.start.distanceTo(this.end), stepLength = this.stepLength, changeRange = this.changeRate;
		let pos = new Vector();
		for (let i = 0; i < Math.abs(distance) / stepLength; i++) {
			pos.x += Math.random() * changeRange * 2 - changeRange;
			const nowRange = range - Math.abs((Math.abs(distance) / stepLength / 2 - i) / (Math.abs(distance) / stepLength / 2) * range);
			if (pos.x < -nowRange) {
				pos.x = -nowRange;
			} else if (pos.x > nowRange) {
				pos.x = nowRange;
			}
			pos.y += stepLength;
			this.points.push(pos.clone());
		}
		this.points.push(new Vector(0, distance));
	}

	update(ctx) {
		const timeDelta = performance.now() - this.lastTime;
		this.draw(ctx, Math.max(1 - timeDelta / this.fadeTime, 0));
	}

	draw(ctx, opacity = 1) {


		ctx.save();
		ctx.translate(this.start.x, this.start.y);
		ctx.rotate(this.angle - Math.PI / 2);
		ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity.toString() + ')';
		ctx.lineWidth = this.thickness;
		ctx.shadowBlur = 50;
		ctx.shadowColor = "#ffffff";
		ctx.beginPath();
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for (let point of this.points) {
			ctx.lineTo(point.x, point.y);
		}
		ctx.stroke();
		ctx.restore();
		return this
	}
}

export default Lightning;
export { Vector };
