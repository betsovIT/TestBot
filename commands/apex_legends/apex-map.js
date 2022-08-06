const { AttachmentBuilder } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'apex-map',
	async execute(interaction) {
		await interaction.reply("Loading...");

		try {
			const url = 'https://api.mozambiquehe.re/maprotation';
			const response = await fetch(url,
			{
				method: 'GET',
				headers: {
					'Authorization': `${process.env.APEXLEGENDSAPI}`,
				},
			});
			const json = await response.json();
			
			const date = new Date(json.next.readableDate_start);
			const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));

			const apexIcon = new AttachmentBuilder(`./assets/apex.png`);
			const embed = {
				"type": "rich",
				"title": `MAP ROTATION`,
				"description": "",
				"color": 0x44ff00,
				"fields": [
					{
						"name": `Current Map`,
						"value": `${json.current.map}`,
						"inline": true
					},
					{
						"name": `Remaining Timer`,
						"value": `${json.current.remainingTimer}`,
						"inline": true
					},
					{
						"name": `--------------------------------------------`,
						"value": "\u200B"
					},
					{
						"name": `Next Map`,
						"value": `${json.next.map}`,
						"inline": true
					},
					{
						"name": `Start Time`,
						"value": `${dateUTC.toLocaleString('bg-BG')}`,
						"inline": true
					},
					{
						"name": `Test Time`,
						"value": `${date.toString()}`,
						"inline": true
					}
				],
				"image": {
					"url": `${json.current.asset}`,
					"height": 0,
					"width": 0
				},
				"thumbnail": {
					"url": `attachment://apex.png`
				}
			}
			await interaction.editReply({content:'OK', embeds: [embed], files: [apexIcon] });

		} catch (error) {
			console.error(error);
			interaction.editReply('Stupid API error...');
		}
	},
};