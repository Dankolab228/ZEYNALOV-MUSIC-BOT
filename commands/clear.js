const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "clear",
  description: "Очищает очередь музыки.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);
    
    try {
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ В данный момент музыка не играет!!!!', ephemeral: true });
      }

      if (!queue.songs[0]) {
        return interaction.reply({ content: '❌ Очередь пуста!!', ephemeral: true });
      }

      await queue.stop(interaction.guild.id);

      const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({
          name: 'Cleared List',
          iconURL: 'https://media.tenor.com/4sbmrhjR4qQAAAAi/pepe-pepedj.gif',
          url: 'https://github.com/Dankolab228/ZEYNALOV-MUZIK-BOTIK/'
        })
        .setDescription('**Очередь очищена.**')
       

      interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e); 
    }
  },
};
