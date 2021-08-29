const fs = require('fs');

module.exports = {
	reactToKeyword(message) {
		const file = fs.readFileSync('./storage/reactionKeywords.json');
		const arr = JSON.parse(file).mappings;

		for (const map of arr) {
			if (message.content.indexOf(map.keyword) > -1) {
				message.channel.send(map.url);
			}
		}
	},
};