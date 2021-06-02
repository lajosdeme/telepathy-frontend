import { create } from 'ipfs-http-client';
import API from '../api'

export default class IpfsClient {
    constructor() {
        const ipfs = create('http://localhost:8080')

        this.addFile = async (img) => {
            let result

            await ipfs.add(img).then(async res => {
                console.log(res)
                const hash = res.path
                result = hash
            }).catch(err => {
                console.log(err)
                result = err
            })

            return result
        }
    }
}