import { Client, Intents, MessageEmbed } from "discord.js";
import { token } from "./config.js";
import { getKid } from "./getKid.js";
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });
client.once('ready', async () => {
    console.log('Ready!');
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const { commandName } = interaction;
    if (commandName === 'kid') {
        await interaction.deferReply();
        let id = interaction.options.get('id', true).value;
        let metadata = await getKid(id);
        if (metadata) {
            let embed = new MessageEmbed()
                .setTitle(`Cyber Kid #${id}`)
                .setURL(`https://objkt.com/asset/cyberkidzclub/${id}`)
                .setImage(metadata.artifactUri)
                .addFields(metadata.attributes.map((a) => ({ ...a, inline: true })));
            await interaction.editReply({ embeds: [embed] });
        }
        else {
            await interaction.editReply('No kid with such ID found');
        }
    }
});
client.login(token);
