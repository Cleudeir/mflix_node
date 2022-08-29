class Revalidate {
	constructor(name,revalidateTimeHours) {
		this.name = name
		this.timeStart = Date.now();
		this.revalidateTime = revalidateTimeHours * 60 * 60 * 1000;
		this.count = 0;
		this.data = [];
	}
	async check(_function, params) {
		if(this.count===0){
			this.data = await _function(params);
		}

		this.count += 1
		const timeNow = Date.now();
		console.log("Revalidate ",this.name, ((timeNow - this.timeStart)/1000/60).toFixed(2),'/', this.revalidateTime/1000/60,'min')
		if (timeNow - this.timeStart > this.revalidateTime) {
			this.data = _function(params);
			this.timeStart = Date.now();
		}
	}
}
module.exports = Revalidate;
