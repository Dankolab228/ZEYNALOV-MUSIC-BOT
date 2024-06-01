const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: "help",
  description: "Получите информацию о боте и командах.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('🎸 **Музыкальные команды**')
        .addFields(
          { name: '🎹 Play', value: 'Потоковая передача песни по заданной ссылке или текста из источников' },
          { name: '⏹️ Stop', value: 'Заставляет бота перестать проигрывать музыку ' },
          { name: '📊 Queue', value: 'Просмотр и управление очередью песен на этом сервере' },
          { name: '⏭️ Skip', value: 'Пропустить текущую воспроизводимую песню' },
          { name: '⏸️ Pause', value: 'Приостановить воспроизведение текущей песни' },
          { name: '▶️ Resume', value: 'Возобновить воспроизведение текущей приостановленной песни' },
          { name: '🔁 Loop', value: 'Включить режим цикла для очереди и текущей песни' },
          { name: '⏩ Seek', value: 'Перейти к определенному времени в текущей песне' },
          { name: '⏮️ Previous', value: 'Воспроизвести предыдущую песню в очереди' },
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`); 

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Базовые команды**')
        .addFields(
          { name: '🗑️ Clear', value: 'Очистить очередь песен на этом сервере' },
          { name: '🎧 Filter', value: 'Применяйте фильтры, чтобы улучшить звук так, как вам нравится' },
           { name: '🎵 Now Playing', value: 'Отображение информации о воспроизводимой в данный момент песне' },
          { name: '🔊 Volume', value: 'Отрегулируйте громкость музыки [ Прослушивание на большой громкости может повредить вашему здоровью ]' },
        ) 
       .setImage('https://33.media.tumblr.com/92a857abda5b890065085e1911cb09e0/tumblr_ndgzdkFwUo1tbh1dho1_500.gif')
      const button1 = new ButtonBuilder()
        .setLabel('Dankolab')
        .setURL('https://t.me/I_just_want_to_sleep0_0')
        .setStyle(ButtonStyle.Link);

      const button2 = new ButtonBuilder()
        .setLabel('Trtm')
        .setURL('https://t.me/GeraltCiriNarutoSimonSakutaCYKAA')
        .setStyle(ButtonStyle.Link);

      const button3 = new ButtonBuilder()
        .setLabel('Shpoksem')
        .setURL('https://t.me/Shpoksem')
        .setStyle(ButtonStyle.Link);

      const button4 = new ButtonBuilder()
        .setLabel('Zxc_pudge')
        .setURL('https://t.me/Wele_09')
        .setStyle(ButtonStyle.Link)

      const button5 = new ButtonBuilder()
        .setLabel('Kimxri')
        .setURL('https://t.me/kimxri')
        .setStyle(ButtonStyle.Link)

      const row = new ActionRowBuilder()
        .addComponents(button1, button2, button3, button4, button5);

      interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed],
        components: [row]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};
