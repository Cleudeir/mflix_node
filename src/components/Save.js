const fs = require('fs');
const fsSync = require('fs').promises;
const path = require('path');
class Save {
	constructor(name) {
		this.name = name
		this.data = []
	}

	async read() {
		console.log(this.name, 'data', this.data.length)
			return this.data
	}
	async verify(list) {
		if (typeof list !== "object") {
			return console.warn(">>>>>>", list)
		}
		this.data = JSON.parse(await fsSync.readFile(`./temp/${this.name}.json`)) || []
		console.log(this.name, 'data', this.data.length)

		const read = this.data.map(x => x["uuid"])
		console.log(
			'>>>>> verify start:',this.name, this.data.length, read.lenght, '<<<<<<',
		)
		if (read.length > 0) {
			let difference = list.filter(x => !read.includes(x["uuid"]));
			console.log(
				'>>>>> name:', this.name, '- difference:', difference.length, '<<<<<<',
			)
		return difference
		}
		return list
	}
	async insert(item) {
		if (!item) return
		try {
			const filter = this.data.filter(x => x.uuid === item.uuid)
			if (filter.length === 0) {
				this.data = [...this.data, item]
				console.log(
					'>>>>> verify:',this.name, this.data.length, '<<<<<<',
				)
				fs.writeFileSync(`./temp/${this.name}.json`, JSON.stringify(this.data));
			}
		} catch (error) {
			console.log('Not insert')
		}
	}
}
module.exports = Save;
