import TelepathyAPI from './api/index'

const API = new TelepathyAPI({
    nodes: process.env.NODES ? process.env.NODES.split(',') : ['ws://localhost:26657'],
    rest: process.env.REST || 'http://localhost:8080'
})

export default API