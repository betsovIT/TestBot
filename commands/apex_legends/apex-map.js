const { maps } = require('../../enums.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'apex-map',
	description: 'Display current map rotation',
	type: 'message',
	execute(message, args) {
		const url = 'https://api.mozambiquehe.re/maprotation';
		// let oldCall = {};

		fetch(url,
			{
				method: 'GET',
				headers: {
					'Authorization': `${process.env.APEXLEGENDSAPI}`,
				},
			})
			.then(response => response.json())
			.then(data => {
				const currentMap = data.current.map;
				const nextMap = data.next.map;
				const currentMapEnd = new Date(data.current.readableDate_start);

				const embed = new Discord.MessageEmbed()
					.setTitle(`Current map: ${currentMap}`)
					.addFields(
						{ name: 'Map ends:', value: currentMapEnd.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', timeZone: 'Europe/Sofia' }) },
						{ name: 'Next map:', value: nextMap },
					)
					.setAuthor('TestBot')
					.setTimestamp()
					.setColor('#ccc072');

				if(currentMap == maps.KINGSCANYON) {
					embed
						.attachFiles(['./assets/kingsCanyon.jpg'])
						.setImage('attachment://kingsCanyon.jpg');
				}
				else if(currentMap == maps.OLYMPUS) {
					embed
						.attachFiles(['./assets/olympus.jpg'])
						.setImage('attachment://olympus.jpg');
				}

				// oldCall.currentMap = currentMap;
				// oldCall.nextMap = nextMap;
				// oldCall.currentMapEnd = currentMapEnd;

				message.channel.send(embed);
			})
			.catch(error => {
				console.error(error);
				message.channel.send('Stupid API error...');
			});
	},
};