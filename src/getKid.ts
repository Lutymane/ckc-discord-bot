import { type MichelsonMap } from "@taquito/taquito";
import { bytes2Char } from "@taquito/utils";
import axios from "axios";
import { storage_fa2 } from "./contract.js";

import { ipfsGate } from './config.js'

async function getKid(cyberKidId: number | string) {
    let tokenMetadata = await storage_fa2.assets.token_metadata.get<{
        token_info: MichelsonMap<string, string>;
    }>(cyberKidId);

    if (!tokenMetadata) {
        //"No kid with such id"
        return null;
    }

    let ipfsHashBytes = tokenMetadata.token_info.get("");

    let ipfsPath = bytes2Char(ipfsHashBytes).replace("ipfs://", ipfsGate);

    let metadata = await axios
        .get<{
            artifactUri: string;
            attributes: Array<{ name: string; value: string }>;
        }>(ipfsPath)
        .then((r) => r.data);

    metadata.artifactUri = metadata.artifactUri.replace("ipfs://", ipfsGate)

    return metadata;
}


export { getKid }
