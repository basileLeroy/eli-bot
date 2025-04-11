import { EmbedBuilder } from "discord.js";
import { config } from "dotenv";
config();

async function handleSuggest(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const user = interaction.user;

    const suggestionChannelId = process.env.CHANNEL_SUGGESTIONS_ID;
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

export default handleSuggest;