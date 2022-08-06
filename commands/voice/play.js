const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, entersState, StreamType,  AudioPlayerStatus,  VoiceConnectionStatus } = require("@discordjs/voice");

module.exports = {	
	name: 'play',
	cooldown: 20,
	async execute(interaction) {
		if (interaction.member.voice.channel) {
			const isInRole = interaction.member.roles.cache.some(role => role.name == 'Memer');

			if (isInRole) {
				await interaction.reply("Loading...");
				const Player = createAudioPlayer();
				try {
					const resource = createAudioResource(`./assets/sounds/${interaction.options.data[0].value}.mp3`, {
						inputType: StreamType.Arbitrary,
						inlineVolume: true 
					  });
					resource.volume.setVolume(0.5);

					Player.play(resource);				
					const connection = await joinVoiceChannel({ 
						channelId:interaction.member.voice.channel.id, 
						guildId: interaction.guild.id, 
						adapterCreator: interaction.guild.voiceAdapterCreator})
					.subscribe(Player);

					Player.addListener("stateChange", (oldOne, newOne) => {
						if (newOne.status == "idle") {
							connection.connection.disconnect();
						}
					});

					interaction.editReply({content: `Playing ${interaction.options.data[0].value}.mp3`});

				} catch (error) {
					interaction.reply({ content: error.message || "Error" });
				}
			}
			else {
				interaction.reply('You don\'t have sufficent priviliges.');
			}
		}
		else {
			interaction.reply('You need to join a voice channel.');
		}
	},
};