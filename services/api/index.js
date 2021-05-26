import axios from 'axios'

const prefix = 'cosmos'
const chainId = 'telepathy'

export default class TelepathyAPI {
    constructor(opts) {
        let handlers = {}

        let nodes = opts.nodes

        if (!nodes || !nodes.length) {
            throw Error('Invalid nodes array.')
        }

        this.rest = opts.rest

        this.retryCounter = 0
        this.isReconnnecting = false

        this.main = {
            listAllThoughts: async () => {
                let result = await axios.get(`${this.rest}/telepathy/thought`)
                return result.data.result
            },

            getProfile: async (userId) => {
                let result = await axios.get(`${this.rest}/telepathy/user/${userId}`)
                return result.data.result
            }
        }
    }
}