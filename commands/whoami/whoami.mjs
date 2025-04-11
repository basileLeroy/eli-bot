import { EmbedBuilder } from "discord.js";
import { config } from "dotenv";
config();

async function handleWhoami(interaction) {
    const guildName = interaction.guild?.name ?? "this server";
    const botMember = await interaction.guild?.members.fetchMe();
    const botDisplayName = botMember?.nickname || botMember?.user.username || "Eli";
    const suggestionChannelId = process.env.CHANNEL_SUGGESTIONS_ID;
    const suggestionChannel = interaction.guild.channels.cache.get(suggestionChannelId);

    try {
        const embed = new EmbedBuilder()
            .setColor('#ff5733')
            .setTitle(`👋 Hello, I'm ${botDisplayName}`)
            .setDescription(
                `I'm a clerk at **${guildName}** — always at your service.\n\n` +
                "💡 Want to share a suggestion? Use my slash command.\n" +
                "💬 Need to report something? I'm your go-to.\n" +
                "📣 Admins can use me to post official announcements.\n" +
                "🤝 I'm here to keep communication clear and organized for everyone.\n\n" +
                "### Command list:\n" + 
                "- \`/whoami\`  : I will introduce myself.\n" + 
                `- \`/suggest\` : Make a suggestion in the ${suggestionChannel}.\n` +
                `- \`/report\`  : Report a post/message to the Guild staff.\n`
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

export default handleWhoami;