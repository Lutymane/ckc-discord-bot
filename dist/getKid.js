import { TezosToolkit } from "@taquito/taquito";
import { bytes2Char } from "@taquito/utils";
import axios from "axios";
import { tezosRPC, ipfsGate } from './config.js';
let tezos = new TezosToolkit(tezosRPC);
let cyberKidsContract = await tezos.contract.at("KT19VQfPZhmAw9FN3hs2da3CmezrdP2ubQCc");
let storage = await cyberKidsContract.storage();
async function getKid(cyberKidId) {
    let tokenMetadata = await storage.assets.token_metadata.get(cyberKidId);
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
