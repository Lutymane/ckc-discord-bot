import { bytes2Char } from "@taquito/utils";
import axios from "axios";
import { storage_fa2 } from "./contract.js";
import { ipfsGate } from './config.js';
async function getKid(cyberKidId) {
    let tokenMetadata = await storage_fa2.assets.token_metadata.get(cyberKidId);
    if (!tokenMetadata) {
        return null;
    }
    let ipfsHashBytes = tokenMetadata.token_info.get("");
    let ipfsPath = bytes2Char(ipfsHashBytes).replace("ipfs://", ipfsGate);
    let metadata = await axios
        .get(ipfsPath)
        .then((r) => r.data);
    metadata.artifactUri = metadata.artifactUri.replace("ipfs://", ipfsGate);
    return metadata;
}
export { getKid };
