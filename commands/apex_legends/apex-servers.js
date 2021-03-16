const { ApexLegendsAPI } = require('../../config.json');
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
				let result = '';
				for(const server in data.ApexOauth_Steam) {
					result += `${server}\n`;
					result += `Status = ${data.ApexOauth_Steam[server].Status}\n`;
					result += `Latency = ${data.ApexOauth_Steam[server].ResponseTime}\n`;
					result += '=============\n';
				}
				message.channel.send(result);
			});

	},
};