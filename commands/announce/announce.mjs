import { config } from "dotenv";
config();

async function handleAnnounce(interaction) {
    const modRoleId = process.env.ROLE_MODERATOR;

    if(!modRoleId) {
        return interaction.reply({
            content: "❌ An error occurred: failed to fetch role ID.",
            ephemeral: true
        });
    }

    // Check permissions
    if (!interaction.member.roles.cache.has(modRoleId)) {
        return interaction.reply({
            content: "❌ You don't have permission to use this command.",
            ephemeral: true
        });
    }

    const targetRole = interaction.options.getRole("target_role");
    const targetChannel = interaction.options.getChannel("target_channel");
    const message = interaction.options.getString("message");

    // Validate target channel
    if (!targetChannel.isTextBased()) {
        return interaction.reply({
            content: "❌ The selected channel is not text-based.",
            ephemeral: true
        });
    }

    try {
        await targetChannel.send(`${targetRole}\n${message}`);

        await interaction.reply({
            content: `✅ Announcement sent to ${targetChannel}.`,
            ephemeral: true
        });
    } catch (error) {
        console.error("Announcement error:", error);
        await interaction.reply({
            content: "❌ Failed to send the announcement. Please check bot permissions.",
            ephemeral: true
        });
    }
}

export default handleAnnounce;
