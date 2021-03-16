const { ApexLegendsAPI } = require('../../config.json');
const fetch = require('node-fetch');

module.exports = {
	name: 'apex-map',
	description: 'Display current map rotation',
	execute(message, args) {
		const url = 'https://api.mozambiquehe.re/maprotation';

		fetch(url,
			{
				method: 'GET',
				headers: {
					'Authorization': `${ApexLegendsAPI}`,
				},
			})
			.then(response => response.json())
			.then(data => {
				const newMapStart = new Date(data.next.readableDate_start);
				newMapStart.toLocaleString('en-US', { timeZone: 'Europe/Sofia' });

				message.channel.send(`Current map is ${data.current.map}, next maps is ${data.next.map} and it starts at ${newMapStart.toLocaleTimeString()}`);
			});
	},
};