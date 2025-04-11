async function handlePing(interaction) {
    const start = Date.now();
    await interaction.reply('Pinging...');
    const duration = Date.now() - start;
    const apiPing = interaction.client.ws.ping;

    await interaction.editReply(`🏓 Pong!\nDuration: ${duration}ms\nAPI Ping: ${apiPing}ms`);
}

export default handlePing;