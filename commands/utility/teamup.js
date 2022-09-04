const { Collection } = require('discord.js')

module.exports = {
    name: "teamup",
    cooldown: 10,
    async execute(interaction){
        interaction.reply({content: 'Calculating...'})
        const playerCount = interaction.options.data.length;
        for (let i = 0; i < playerCount; i++) {
            interaction.options.data[i].randomizedNumber = (Math.random() * (100 - 0) + 0);
        }
        let team1, team2 = [];
        if (playerCount <= 4) {
            
        } else if (playerCount > 4 && playerCount < 7) {

        } else {
            interaction.editReply({content: 'I don`t work with more than 6 players.'})
        }
    } 
}