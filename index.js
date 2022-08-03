const {Client, Collection} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const commandLoader = require('./services/commandProcessor.js');
const client = new Client({ intents: [17] }); //GUILDS and GUILD_INTERACTIONS bits google it :)
const cooldowns = new Collection();
commandLoader.LoadCommands(client, 'commands');

client.once('ready', () => {
	console.log('ready!');
});

client.on('interactionCreate', async interaction  => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	// #endregion

	// #region Cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(interaction.member.id)) {
		const expirationTime = timestamps.get(interaction.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return interaction.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(interaction.member.id, now);
	setTimeout(() => timestamps.delete(interaction.member.id), cooldownAmount);
	// #endregion

	// Execution
	try {
		command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end('ok');
});
server.listen(3000);