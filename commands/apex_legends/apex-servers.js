const { ApexLegendsAPI } = require('../../config.json');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'apex-servers',
	description: 'Display current map rotation',
	execute(message, args) {
		const url = 'https://api.mozambiquehe.re/servers';

		fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `${ApexLegendsAPI}`,
			},
		})
			.then(response => response.json())
			.then(data => {

				const embed = new Discord.MessageEmbed()
					.setTitle('Server status:');
				for(const server in data.ApexOauth_Steam) {
					const name = `${server}\n`;
					const value = `Status: ${data.ApexOauth_Steam[server].Status}\nLatency: ${data.ApexOauth_Steam[server].ResponseTime}`;

					embed.addField(name, value, true);
				}
				message.channel.send(embed);
			});

	},
};