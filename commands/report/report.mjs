import { EmbedBuilder } from "discord.js";
import { config } from "dotenv";
config();

async function handleReport(interaction) {
    const messageLink = interaction.options.getString('message_link');
    const reason = interaction.options.getString('reason') || "No reason provided";
    const user = interaction.user;

    const reportsChannelId = process.env.CHANNEL_REPORTS_ID;
    const reportsChannel = interaction.guild.channels.cache.get(reportsChannelId);

    if (!reportsChannel) {
        return interaction.reply({
            content: 'Could not find the reports channel. Please notify an admin.',
            ephemeral: true
        });
    }

    try {
        const reportEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('🚨 New Report')
            .addFields(
                { name: 'Reported by', value: `${user.tag} (${user.id})`, inline: false },
                { name: 'Message Link', value: messageLink, inline: false },
                { name: 'Reason', value: reason, inline: false }
            )
            .setTimestamp();

        await reportsChannel.send({ embeds: [reportEmbed] });

        await interaction.reply({
            content: '✅ Your report has been submitted. Thanks for keeping an eye out for the community.',
            ephemeral: true
        });
    } catch (error) {
        console.error('Error submitting report:', error);
        await interaction.reply({
            content: 'Something went wrong while submitting your report.',
            ephemeral: true
        });
    }
}

export default handleReport;