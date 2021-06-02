import axios from 'axios'

const prefix = 'cosmos'
const chainId = 'telepathy'

export default class TelepathyAPI {
    constructor(opts) {
        let nodes = opts.nodes

        if (!nodes || !nodes.length) {
            throw Error('Invalid nodes array.')
        }

        this.rest = opts.rest

        async function handlePost(client, endpoint, jsonString) {
            let result
            await axios.post(endpoint, jsonString)
            .then(async res => {
                result = await signAndBroadcast(client, res)
            })
            .catch(err => {
                result = err
            })
            return result
        }

        async function handlePut(client, endpoint, jsonString) {
            let result
            const config = { headers: {"Accept": "application/json", "Content-Type": "application/json"} }
            await axios.put(endpoint, jsonString, config)
            .then(async res => {
                result = await signAndBroadcast(client, res)
            })
            .catch(err => {
                result = err
            })
            return result
        }

        async function handleDel(client, endpoint, jsonString) {
            let result
            await axios.delete(endpoint, { data: jsonString })
            .then(async res => {
                result = await signAndBroadcast(client, res)
            })
            .catch(err => {
                result = err
            })
            return result
        }

        async function signAndBroadcast(client, res) {
            let result
            const msg = res.data.value.msg
            const fee = res.data.value.fee

            await client.signAndBroadcast(msg, fee).then(signRes => {
                result = signRes
            }).catch(err => {
                result = err
            })
            return result
        }

        this.main = {

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------- GET REQUESTS ---------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

            listAllUsers: async () => {
                let result = await axios.get(`${this.rest}/telepathy/user`)
                return result.data.result
            },

            getProfile: async (userId) => {
                let result = await axios.get(`${this.rest}/telepathy/profile/${userId}`)
                return result.data.result
            },

            getUser: async (userId) => {
                let result = await axios.get(`${this.rest}/telepathy/user/${userId}`)
                return result.data.result
            },

            getAvatar: async (userId) => {
                let result = await axios.get(`${this.rest}/telepathy/user/avatar/${userId}`)
                return result.data.result
            },

            listThoughtsByCreator: async (creatorId) => {
                let result = await axios.get(`${this.rest}/telepathy/user/${creatorId}/thoughts`)
                return result.data.result
            },

            listAllComments: async () => {
                let result = await axios.get(`${this.rest}/telepathy/comment`)
                return result.data.result
            },

            getComment: async (commentId) => {
                let result = await axios.get(`${this.rest}/telepathy/comment/${commentId}`)
                return result.data.result
            },

            listAllThoughts: async () => {
                let result = await axios.get(`${this.rest}/telepathy/thought`)
                return result.data.result
            },

            getThought: async (thoughtId) => {
                let result = await axios.get(`${this.rest}/telepathy/thought/${thoughtId}`)
                return result.data.result
            },

            listCommentsForThought: async (thoughtId) => {
                let result = await axios.get(`${this.rest}/telepathy/thought/${thoughtId}/comments`)
                return result.data.result
            },

            listCommentsForComment: async (ownerCommentId) => {
                let result = await axios.get(`${this.rest}/telepathy/comment/${ownerCommentId}/comments`)
                return result.data.result
            },

/* ---------------------------------------------------------------------------------------------- */
/* --------------------------------------- POST REQUESTS ---------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
            //Create user
            createUser: async (client, username, bio) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/user`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    username: username,
                    bio: bio
                })

                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            followUser: async (client, userId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/user/follow`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    id: userId
                })
                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            unfollowUser: async (client, userId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/user/unfollow`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    id: userId
                })

                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            createComment: async (client, thoughtId, ownerCommentId, message) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/comment`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    message: message,
                    thoughtId: thoughtId,
                    ownerCommentId: ownerCommentId
                })

                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            likeComment: async (client, commentId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/comment/like`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    id: commentId
                })

                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            dislikeComment: async (client, commentId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/comment/dislike`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    id: commentId
                })

                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            createThought: async (client, message) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/thought`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    message: message
                })

                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            //Like thought
            likeThought: async (client, thoughtId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/thought/like`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    id: thoughtId
                })

                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            //Dislike thought
            dislikeThought: async (client, thoughtId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/thought/dislike`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    creator: address,
                    id: thoughtId
                })
                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

            //Set avatar
            setAvatar: async (client, userId, hash) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/user/avatar`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address 
                    },
                    creator: address,
                    id: userId,
                    avatar: hash
                })
                const result = await handlePost(client, endpoint, jsonString)
                return result
            },

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------- PUT REQUESTS ---------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
            setUser: async (client, username, bio) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/user`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    id: address,
                    creator: address,
                    username: username,
                    bio: bio
                })
                const result = await handlePut(client, endpoint, jsonString)
                return result
            },

            setComment: async (client, commentId, message, thoughtId, ownerCommentId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/comment`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    id: commentId,
                    creator: address,
                    message: message,
                    thoughtId: thoughtId,
                    ownerCommentId: ownerCommentId
                })

                const result = await handlePut(client, endpoint, jsonString)
                return result
            },

            setThought: async (client, message, thoughtId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/thought`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    id: thoughtId,
                    creator: address,
                    message: message,
                })

                const result = await handlePut(client, endpoint, jsonString)
                return result
            },

/* ---------------------------------------------------------------------------------------------- */
/* ------------------------------------- DELETE REQUESTS ---------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
            deleteUser: async (client) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/user`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    id: address,
                    creator: address
                })
                const result = await handleDel(client, endpoint, jsonString)
                return result
            },

            deleteComment: async (client, commentId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/comment`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    id: commentId,
                    creator: address
                })

                const result = await handleDel(client, endpoint, jsonString)
                return result
            },

            deleteThought: async (client, thoughtId) => {
                const address = client.signerAddress
                const endpoint = `${this.rest}/telepathy/thought`
                const jsonString = JSON.stringify({
                    base_req: {
                        chain_id: chainId,
                        from: address
                    },
                    id: thoughtId,
                    creator: address
                })

                const result = await handleDel(client, endpoint, jsonString)
                return result
            }
        }
    }
}