import { TezosToolkit } from "@taquito/taquito";
import { tezosRPC } from "config";
export const tezos = new TezosToolkit(tezosRPC);
let cyberKidsContract = await tezos.contract.at("KT19VQfPZhmAw9FN3hs2da3CmezrdP2ubQCc");
let storage = await cyberKidsContract.storage();
