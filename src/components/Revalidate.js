const fs = require('fs');
const fsSync = require('fs').promises;
const path = require('path');
class Revalidate {
	constructor(name, revalidateTimeDays) {
		this.name = name
		this.timeStart = Date.now();
		this.revalidateTime = revalidateTimeDays * 24 * 60 * 60 * 1000;
		this.count = 0;
		this.data = [];
	}
	async check(_function, params) {
		this.count += 1
		console.log(this.count)
		if (this.count === 1) {
			console.log('readFileSync')
			let read;
			try {
				read = await require(path.resolve(`./temp/${this.name}.json`))
				this.data = read
				console.log(this.name, 'readFileSync', read.length)
			} catch (err) {
				if (!read) {
					this.data = await _function(params);
					await fsSync.writeFile(`./temp/${this.name}.json`, JSON.stringify(this.data), {
						encoding: "utf8",
						flag: "w",
						mode: 0o666
					});
					console.log(this.name, 'buscar', this.data.length )
				}
			}
		}

		const timeNow = Date.now();
		console.log(this.name, "Revalidate Nº:", this.count, ((timeNow - this.timeStart) / 1000 / 60).toFixed(2), '/', this.revalidateTime / 1000 / 60, 'min')
		if (timeNow - this.timeStart > this.revalidateTime) {
			this.data = _function(params);
			this.timeStart = Date.now();
		}
		fs.writeFileSync(`./temp/${this.name}.json`, JSON.stringify(this.data), {
			encoding: "utf8",
			flag: "w",
			mode: 0o666
		});
		return this.data
	}
}
module.exports = Revalidate;
