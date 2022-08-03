const fetch = require('node-fetch');
const dotenv = require('dotenv');
const Discord = require('discord.js');
dotenv.config();

module.exports = {
	name: 'apex-stats',
	description: 'Recieve apex stats for a given player',
	type: 'message',
	args: true,
	execute(message, args) {
		let url = 'https://api.mozambiquehe.re/bridge?platform=PC';
		const player = args[0];
		url += `&player=${player}`;


		fetch(url,
			{
				method: 'GET',
				headers: {
					'Authorization': `${process.env.APEXLEGENDSAPI}`,
				},
			})
			.then(response => response.json())
			.then(data => {
				const rankDivision = new Discord.MessageAttachment(`./assets/rankIcons/${data.global.rank.rankName.toLowerCase()}.png`)
				const apexIcon = new Discord.MessageAttachment(`./assets/apex.png`)
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
						"files":[
							rankDivision,
							apexIcon
						],
						"image": {
							"url": `attachment://${data.global.rank.rankName.toLowerCase()}.png`
						},
						"thumbnail": {
							"url": `attachment://apex.png`,
							"height": 30,
							"width": 30
						  }
					};

				message.channel.send({ embed: embed});
				// message.channel.send(file);
			})
			.catch(error => {
				console.error(error);
				message.channel.send('Stupid API error.');
			});
	},
};