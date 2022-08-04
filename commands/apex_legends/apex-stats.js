const { AttachmentBuilder } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'apex-stats',
	cooldown:5,
	execute(interaction) {
		let url = 'https://api.mozambiquehe.re/bridge?platform=PC';
		const player = interaction.options.data.find(o => o.name == 'player')?.value;
		url += `&player=${player}`;
		fetch(url,
			{
				method: 'GET',
				headers: {
					'Authorization': `${process.env.APEXLEGENDSAPI}`,
				},
			})
			.then(response => response.json())
			.then(async data => {
				if (data.Error != null) throw Error;

				const rankDivision = new AttachmentBuilder(`./assets/rankIcons/${data.global.rank.rankName.toLowerCase()}.png`);
				const apexIcon = new AttachmentBuilder(`./assets/apex.png`);
				const embed = {
						"type": "rich",
						"title": `Player: ${data.global.name}`,
						"description": `This is the ${data.global.name}'s rank information:`,
						"color": 0x6c0170,
						"fields": [
						  {
							"name": `Rank`,
							"value": `${data.global.rank.rankName}`,
							"inline": true
						  },
						  {
							"name": `Rank Score`,
							"value": `${data.global.rank.rankScore}`,
							"inline": true
						  },
						  {
							"name": `Rank Division`,
							"value": `${data.global.rank.rankDiv}`,
							"inline": true
						  }
						],
						"image": {
							"url": `attachment://${data.global.rank.rankName.toLowerCase()}.png`
						},
						"thumbnail": {
							"url": `attachment://apex.png`,
						  }
					};

				await interaction.channel.send({ embeds: [embed], files: [rankDivision, apexIcon] });
			})
			.catch(error => {
				console.error(error);
				interaction.channel.send('Stupid API error.');
			});
	},
};