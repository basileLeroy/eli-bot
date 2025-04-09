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

    console.log(interaction);

    const guildName = interaction.guild?.name ?? "this server";
    const botMember = await interaction.guild?.members.fetchMe();
    const botDisplayName = botMember?.nickname || botMember?.user.username || "Eli";

    if (interaction.commandName === 'whoami') {
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
    }
});

eli.login(process.env.APP_TOKEN);