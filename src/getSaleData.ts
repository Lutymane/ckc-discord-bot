import { storage_cs } from './contract.js'

async function getSaleData() {
    return {
        soldAmount: storage_cs.sale.soldAmount,
        saleSupply: storage_cs.sale.saleSupply,
    }
}

export { getSaleData }