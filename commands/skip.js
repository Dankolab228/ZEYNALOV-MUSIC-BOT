
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "skip",
  description: "Пропускает текущий трек и переходит к следующему.",
  permissions: "0x0000000000000800",
  options: [{
    name: "number",
    description: "Укажите, сколько песен вы хотите пропустить",
    type: ApplicationCommandOptionType.Number,
    required: false
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ В данный момент музыка не играет!!', ephemeral: true }).catch(e => { })

      let number = interaction.options.getNumber('number');
      if (number) {
        if (!queue.songs.length > number) return interaction.reply({ content: '⚠️Превышено текущее количество песен', ephemeral: true }).catch(e => { })
        if (isNaN(number)) return interaction.reply({ content: '⚠️ Неправильный номер', ephemeral: true }).catch(e => { })
        if (1 > number) return interaction.reply({ content: '⚠️ Неправильный номер', ephemeral: true }).catch(e => { })

        try {
        let old = queue.songs[0];
        await client.player.jump(interaction, number).then(song => {
          return interaction.reply({ content: `⏯️ Пропущено : **${old.name}**` }).catch(e => { })
        })
      } catch(e){
        return interaction.reply({ content: '❌ Очередь пуста!!', ephemeral: true }).catch(e => { })
      }
      } else {
try {
  const queue = client.player.getQueue(interaction.guild.id);
  if (!queue || !queue.playing) {
    return interaction.reply({ content: '⚠️ В данный момент музыка не играет!!', ephemeral: true });
  }

  let old = queue.songs[0];
  const success = await queue.skip();

  const embed = new EmbedBuilder()
    .setColor('#3498db')
    .setAuthor({
      name: 'Song Skipped',
      iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157269773118357604/giphy.gif?ex=6517fef6&is=6516ad76&hm=f106480f7d017a07f75d543cf545bbea01e9cf53ebd42020bd3b90a14004398e&',
      url: 'https://discord.gg/FUEHs7RCqz'
    })
    .setDescription(success ? ` **SKIPPED** : **${old.name}**` : '❌ Очередь пуста!')
    .setTimestamp();

  return interaction.reply({ embeds: [embed] });
}catch (e) {
          return interaction.reply({ content: '❌ Очередь пуста!!', ephemeral: true }).catch(e => { })
        }
      }

    } catch (e) {
    console.error(e); 
  }
  },
};
