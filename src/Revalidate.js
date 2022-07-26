class Revalidate {
	constructor(revalidateTime) {
		this.timeStart = Date.now();
		this.revalidateTime = revalidateTime * 60 * 1000;
	}
	check(_function, params) {
		const timeNow = Date.now();
		console.log(timeNow - this.timeStart, this.revalidateTime)
		if (timeNow - this.timeStart > this.revalidateTime) {
			_function(params);
			this.timeStart = Date.now();
		}
	}
}
module.exports = Revalidate;
