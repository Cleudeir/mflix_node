const fs = require('fs');
const fsSync = require('fs').promises;
const path = require('path');
class Save {
	constructor(name) {
		this.name = name
		this.create()
	}
	async create() {
		let read;
		try {
			read = JSON.parse(await fsSync.readFile(`./temp/${this.name}.json`))
			console.log(this.name, read.length)
		} catch (error) {
			await fsSync.writeFile(`./temp/${this.name}.json`, JSON.stringify([]))
			console.log(this.name)
		}
	}
	async read() {
		let read;
		try {
			read = JSON.parse(
				await fsSync.readFile(`./temp/${this.name}.json`)
			)
			return read
		} catch (error) {
			console.log(error)
			return []
		}
	}
	async verify(list) {
		let read;
		if (typeof list !== "object") {
			return console.warn(">>>>>>", list)
		}
		try {
			read = JSON.parse(
				await fsSync.readFile(`./temp/${this.name}.json`)
			).map(x => x["uuid"])
			if (read.length > 0) {
				let difference = list.filter(x => !read.includes(x["uuid"]));
				console.log(
					'>>>>> name:', this.name, '- difference:', difference.length, '<<<<<<',
				)
				return difference
			}
			return list
		} catch (error) {
			console.log(list.length, "Não há nenhum existente!")
			return list
		}
	}
	async insert(data) {
		if (!data) return
		const read = await fsSync.readFile(`./temp/${this.name}.json`)
		const json = JSON.parse(read)
		console.log('insert :', json.length)
		fs.writeFileSync(`./temp/${this.name}.json`, JSON.stringify([...json, data]));
	}
}
module.exports = Save;
