const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'apex-stats',
	description: 'Recieve apex stats for a given player',
	type: 'message',
	args: true,
	execute(message, args) {
		let url = 'https://api.mozambiquehe.re/bridge?version=5&platform=PC';
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
				message.channel.send(`Your level is: ${data.global.level};\nYour selected legend is: ${data.legends.selected.LegendName} \nYour current skin is: ${data.legends.selected.gameInfo.skin}`);
			})
			.catch(error => {
				console.error(error);
				message.channel.send('Stupid API error.');
			});
	},
};