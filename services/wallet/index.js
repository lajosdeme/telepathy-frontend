import { Secp256k1HdWallet } from "@cosmjs/launchpad"

export default class TelepathyWallet {
    constructor() {
        this.main = {
            importExisting: async (mnemonic) => {
                const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic)
                const [{ address }] = await wallet.getAccounts();
                console.log("Address:", address);
                return wallet
            }
        }
    }
}