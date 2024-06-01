const db = require("../mongoDB");
module.exports = {
  name: "filter",
  description: "Добавляет аудиофильтр к текущей музыке.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
      const queue = client?.player?.getQueue(interaction?.guild?.id);
      if (!queue || !queue?.playing) return interaction?.reply({ content: '⚠️ В данный момент музыка не играет!!', ephemeral: true }).catch(e => { })

      let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel("3Д")
        .setCustomId('3d')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Усиление басса")
        .setCustomId('bassboost')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Эхо")
        .setCustomId('echo')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Найткор")
        .setCustomId('nightcore')
        .setStyle(ButtonStyle.Secondary)
      )

      let buttons2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Вапорвейв")
          .setCustomId('vaporwave')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Объемное звучание")
        .setCustomId('surround')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Заложенность")
        .setCustomId('earwax')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Караоке")
        .setCustomId('karaoke')
        .setStyle(ButtonStyle.Secondary)
      )
      

      let embed = new EmbedBuilder()
      .setColor('#01fe66')
      .setAuthor({
          name: 'Аудио фильтры ',
          iconURL: 'https://media.tenor.com/D_F--PvRH4wAAAAi/pepe-listening-to-music.gif',
          url: 'https://github.com/Dankolab228/ZEYNALOV-MUZIK-BOTIK/'
        })
      .setDescription('** Выберите фильтр для лучшего звучания**')
  
    interaction.reply({ embeds: [embed], components: [buttons, buttons2] }).then(async Message => {

      const filter = i => i.user.id === interaction?.user?.id
      let col = await Message?.createMessageComponentCollector({ filter, time: 60000 });

      col.on('collect', async (button) => {
        if (button?.user?.id !== interaction?.user?.id) return
        await button?.deferUpdate().catch(e => { })
        let filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "surround", "earwax"]
if(!filters?.includes(button?.customId)) return

      let filtre = button.customId
      if (!filtre) return interaction?.editReply({ content: '❌ Неправильное имя', ephemeral: true }).catch(e => { })
     filtre = filtre?.toLowerCase()
   
      if (filters?.includes(filtre?.toLowerCase())) {
        if (queue?.filters?.has(filtre)) {
          queue?.filters?.remove(filtre)
          embed?.setDescription(`Magic : **{filter}**, Текущий фильтр: **{status}**`.replace("{filter}", filtre).replace("{status}", "❌"))
          return interaction?.editReply({ embeds: [embed] }).catch(e => { })
        } else {
          queue?.filters?.add(filtre)
          embed?.setDescription(`Magic : **{filter}**, Текущий фильтр: **{status}**`.replace("{filter}", filtre).replace("{status}", "✅"))
          return interaction?.editReply({ embeds: [embed] }).catch(e => { })
        }
      } else {
        const filter = filters?.find((x) => x?.toLowerCase() === filtre?.toLowerCase())
        embed?.setDescription(`❌ Невозможно найти фильтр!!`.replace("{filters}", filters?.map(mr => `\`${mr}\``).join(", ")))
        if (!filter) return interaction?.editReply({ embeds: [embed] }).catch(e => { })
      }
    })

    col.on('end', async (button, reason) => {
      if (reason === 'time') {

        embed = new EmbedBuilder()
          .setColor(client?.config?.embedColor)
          .setTitle("Time ended.")


        await interaction?.editReply({ embeds: [embed], components: [] }).catch(e => { })
      }
    })

    })

  } catch (e) {
    console.error(e); 
  }
  },
};
