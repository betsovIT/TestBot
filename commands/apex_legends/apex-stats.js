const { AttachmentBuilder } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'apex-stats',
	cooldown:5,
	async execute(interaction) {
		await interaction.reply("Loading...");
		try {
			let url = 'https://api.mozambiquehe.re/bridge?platform=PC';
			const player = interaction.options.data.find(o => o.name == 'player')?.value;
			url += `&player=${player}`;

			const response = await fetch(url,
				{
					method: 'GET',
					headers: {
						'Authorization': `${process.env.APEXLEGENDSAPI}`,
					},
				});
			const json = await response.json();

			if (json.Error != null) throw Error;

			const rankDivision = new AttachmentBuilder(`./assets/rankIcons/${json.global.rank.rankName.toLowerCase()}.png`);
			const apexIcon = new AttachmentBuilder(`./assets/apex.png`);
			const embed = {
				"type": "rich",
				"title": `Player: ${json.global.name}`,
				"description": `This is the ${json.global.name}'s rank information:`,
				"color": 0x6c0170,
				"fields": [
					{
					"name": `Rank`,
					"value": `${json.global.rank.rankName}`,
					"inline": true
					},
					{
					"name": `Rank Score`,
					"value": `${json.global.rank.rankScore}`,
					"inline": true
					},
					{
					"name": `Rank Division`,
					"value": `${json.global.rank.rankDiv}`,
					"inline": true
					}
				],
				"image": {
					"url": `attachment://${json.global.rank.rankName.toLowerCase()}.png`
				},
				"thumbnail": {
					"url": `attachment://apex.png`
				}
			};

			await interaction.editReply({content: 'OK', embeds: [embed], files: [rankDivision, apexIcon] });

		} catch (error) {
			console.error(error);
			await interaction.editReply('Stupid API error.');
		}
	},
};