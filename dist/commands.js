import { MessageEmbed } from "discord.js";
import { getKid } from "getKid";
export const commands = {
    async kid(interaction) {
        await interaction.deferReply();
        let id = interaction.options.get('id', true).value;
        let metadata = await getKid(id);
        if (metadata) {
            let embed = new MessageEmbed()
                .setTitle(`Cyber Kid #${id}`)
                .setColor(0x00fefe)
                .setURL(`https://objkt.com/asset/cyberkidzclub/${id}`)
                .setImage(metadata.artifactUri)
                .addFields(metadata.attributes.map((a) => ({ ...a, inline: true })));
            await interaction.editReply({ embeds: [embed] });
        }
        else {
            await interaction.editReply('No kid with such ID found');
        }
    }
};
