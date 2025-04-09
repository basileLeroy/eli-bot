import { Client, Events, IntentsBitField, EmbedBuilder } from "discord.js";
import { config } from "dotenv";
config();

const eli = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.MessageContent,
    ]
});

eli.on(Events.ClientReady, client => {
    console.log(`${client.user.tag} clocked in and started working!`);
});

eli.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const guildName = interaction.guild?.name ?? "this server";
    const botMember = await interaction.guild?.members.fetchMe();
    const botDisplayName = botMember?.nickname || botMember?.user.username || "Eli";

    if (interaction.commandName === 'ping') {
        const start = Date.now();
        await interaction.reply('Pinging...');
        const duration = Date.now() - start;
        const apiPing = interaction.client.ws.ping;

        await interaction.editReply(`🏓 Pong!\nDuration: ${duration}ms\nAPI Ping: ${apiPing}ms`);
    }

    if (interaction.commandName === 'whoami') {
        try {
            const embed = new EmbedBuilder()
                .setColor('#ff5733')
                .setTitle(`👋 Hello, I'm ${botDisplayName}`)
                .setDescription(
                    `I'm a clerk at **${guildName}** — always at your service.\n\n` +
                    "💡 Want to share a suggestion? Use my slash command.\n" +
                    "💬 Need to share feedback or report something? I'm your go-to.\n" +
                    "📣 Admins can use me to post official announcements.\n" +
                    "🤝 I'm here to keep communication clear and organized for everyone."
                )
                .setThumbnail('https://i.ibb.co/GfdcdLSV/eli-the-clerk.png')
                .setFooter({ text: 'Always watching, always writing.', iconURL: 'https://i.ibb.co/GfdcdLSV/eli-the-clerk.png' });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'Could not generate the embedded message',
                ephemeral: true
            });
        }
    }

    if (interaction.commandName === 'suggest') {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const user = interaction.user;
        
        const suggestionChannelId = process.env.SUGGESTION_CHANNEL_ID;
        const suggestionChannel = interaction.guild.channels.cache.get(suggestionChannelId);
        
        if (!suggestionChannel) {
            return interaction.reply({
                content: 'Could not find the suggestions channel! Please notify the server staff.',
                ephemeral: true
            });
        }
        
        try {
            const suggestionEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(title)
                .setDescription(description)
                .setAuthor({
                    name: `Suggestion by ${user.username}`,
                    iconURL: user.displayAvatarURL()
                })
                .setTimestamp();
            
            const suggestionMessage = await suggestionChannel.send({
                content: `${user} has made a suggestion!`,
                embeds: [suggestionEmbed]
            });
            
            await suggestionMessage.react('⬆️');
            await suggestionMessage.react('⬇️');
            
            await interaction.reply({
                content: 'Your suggestion has been submitted successfully!',
                ephemeral: true
            });
            
        } catch (error) {
            console.error('Error submitting suggestion:', error);
            await interaction.reply({
                content: 'There was an error submitting your suggestion. Please try again later.',
                ephemeral: true
            });
        }
    }
});

eli.login(process.env.APP_TOKEN);