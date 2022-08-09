class Revalidate {
	constructor(name,revalidateTime) {
		this.name = name
		this.timeStart = Date.now();
		this.revalidateTime = revalidateTime * 60 * 1000;
		this.count = 0;
	}
	check(_function, params) {
		console.log(this.name,'count: ', this.count)
		if(this.count===0){
			_function(params);
		}
		this.count += 1 
		const timeNow = Date.now();
		console.log(timeNow - this.timeStart, this.revalidateTime)
		if (timeNow - this.timeStart > this.revalidateTime) {
			_function(params);
			this.timeStart = Date.now();
		}
	}
}
module.exports = Revalidate;
