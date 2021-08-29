const fs = require('fs');

module.exports = {
	name: 'poll',
	description: 'Polls adding a response to a keyword',
	cooldown: 15,
	type: 'reaction',
	async execute(reaction, user, args) {

		if (args.length < 2) return;

		const file = fs.readFileSync('./storage/reactionKeywords.json');
		let obj = JSON.parse(file);

		const entry = obj.mappings.filter(a => {
			return a.keyword == args[0];
		})[0];

		let upvotes = 0;
		let downvotes = 0;

		const reactionTypes = await reaction.message.reactions.cache;

		for (const itm of reactionTypes) {
			if (itm[1]._emoji.name == 'upvote') {
				upvotes = itm[1].count;
			}

			if (itm[1]._emoji.name == 'downvote') {
				downvotes = itm[1].count;
			}
		}

		const count = upvotes - downvotes;

		if (!entry && count >= 3) {
			obj.mappings.push({
				keyword: args[0],
				url: args[1],
			});
		}

		const result = JSON.stringify(obj);


		fs.writeFileSync('./storage/reactionKeywords.json', result);

	},
};