const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const commandLoader = require('./services/commandProcessor.js');
const prefix = '$$';
const client = new Discord.Client({ partials: ['USER', 'REACTION', 'MESSAGE'] });
const cooldowns = new Discord.Collection();
commandLoader.LoadCommands(client, 'commands');

client.once('ready', () => {
	console.log('ready!');
});

client.on('message', async messagePartial => {
	let message;
	messagePartial.partial ? message = await messagePartial.fetch() : message = messagePartial;

	if (message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLocaleLowerCase();

	// #region Parsing of command and arguments
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.type != 'message') return;
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}`;

		if (command.usage) {
			reply += `\n The proper usage would be \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	// #endregion

	// #region Cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	// #endregion

	// Execution
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.on('messageReactionAdd', async (reactionPartial, userPartial) => {
	let message;
	let reaction;
	let user;

	reactionPartial.partial ? reaction = await reactionPartial.fetch() : reaction = reactionPartial;
	reaction.message.partial ? message = await reaction.message.fetch() : message = reaction.message;
	userPartial.partial ? user = await userPartial.fetch() : user = userPartial;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = reaction.message.content.slice(prefix).trim().split(/ +/);
	const commandName = args.shift().toLocaleLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	if (command.type != 'reaction') return;

	try {
		command.execute(reaction, user, args);
	}
	catch (error) {
		console.error(error);
	}
});

client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end('ok');
});
server.listen(3000);