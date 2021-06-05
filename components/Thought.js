import { Component } from 'react'
import {Button, Container, Divider, Dropdown, Feed, Icon, Image, Loader, Modal} from 'semantic-ui-react'
import ShareThoughtView from './ShareThoughtView'
import styles from './Thought.module.css'
import API from '../services/api'
import Wallet from '../services/wallet'
import {SigningCosmosClient} from '@cosmjs/launchpad'
import Router from 'next/router'
import moment from 'moment'
import Events from '../config/events'

export default class Thought extends Component {

    state = {
        likes: Set,
        liked: false,
        client: SigningCosmosClient,
        address: "",
        loading: false,
        key: undefined,
        editThoughtOn: false,
        avatar: ""
    }

    async componentDidMount() {
        this.setState({loading: true})
        const address = localStorage.getItem("address")
        const wallet = await Wallet.main.importExisting(localStorage.getItem("mnemonic"))

        const client = new SigningCosmosClient("http://localhost:1317/", address, wallet)
        
        const likesSet = new Set(this.props.thought.likes)
        this.setState({likes: likesSet, liked: likesSet.has(address), client: client, address: address, loading: false})

        document.addEventListener(Events.reloadFeed, this.hideEditThought)

        await API.main.getAvatar(this.props.thought.creator).then(avatar => {
            this.setState({avatar: avatar})
        }).catch(err => {
            this.setState({avatar: ""})
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.thought.id != this.props.thought.id) {
            const likesSet = new Set(this.props.thought.likes)
            this.setState({likes: likesSet, liked: likesSet.has(this.state.address)})

            await API.main.getAvatar(this.props.thought.creator).then(avatar => {
                this.setState({avatar: avatar})
            }).catch(err => {
                this.setState({avatar: ""})
            })
        }
    }

    thoughtClicked = () => {
        const as = this.props.isComments ? `/comment/${this.props.thought.id}` : `/thought/${this.props.thought.id}`
        const id = Math.random().toString(36).substring(7)
        Router.push({
            pathname: "/singleThought",
            query: {thoughtId: this.props.thought.id, isComments: this.props.isComments, key: id}
        }, as)
    }

    hideEditThought = () => {
        this.setState({editThoughtOn: false})
    }

    onClick = async (e) => {
        e.stopPropagation()
        this.setState({loading: true})
        const client = this.state.client
        const thoughtId = this.props.thought.id
        const isComments = this.props.isComments

        if (this.state.liked) {

            const result = isComments ? await API.main.dislikeComment(client, thoughtId) : await API.main.dislikeThought(client, thoughtId)
            
            if (result.code === 7) {
                alert(result.rawLog)
                this.setState({loading: false})
            } else {
               this.setState({likes: this.state.likes.delete(this.state.address), liked: false, loading: false}) 
            }
        } 
        else {
            const result = isComments ? await API.main.likeComment(client, thoughtId): await API.main.likeThought(client, thoughtId)

            if (result.code === 7) {
                alert(result.rawLog)
                this.setState({loading: false})
            } else {
                const newLikes = this.state.likes === true ? new Set([this.state.address]) : this.state.likes.add(this.state.address)
                this.setState({likes: newLikes, liked: true, loading: false})
            }
        }
    }

    optionSelected = async (e, {value}) => {
        const isComments = this.props.isComments

        switch (value) {
            case "delete":
                //delete
                this.setState({loading: true})
                const result = isComments ? 
                    await API.main.deleteComment(this.state.client, this.props.thought.id) : 
                    await API.main.deleteThought(this.state.client, this.props.thought.id)
                
                const event = new Event(Events.reloadFeed)
                document.dispatchEvent(event)
                this.setState({loading: false})
                break
            case "edit":
                this.setState({editThoughtOn: true})
                break
            case "follow":
                const followers = new Set(this.props.thought.createdBy.followers)
                const userId = this.props.thought.createdBy.id

                if (followers.has(this.state.address)) {
                    //unfollow
                    await API.main.unfollowUser(this.state.client, userId).then(res => {
                        this.setState({loading: false})
                    }).catch(err => {
                        alert(err)
                    })
                } else {
                    //follow
                    await API.main.followUser(this.state.client, userId).then(res => {
                        this.setState({loading: false})
                    }).catch(err => {
                        alert(err)
                    })
                }
                break
            case "mute":
                //TODO
                break

        }
    }

    avatarClicked = (e) => {
        e.stopPropagation()
        Router.push({
            pathname: "/profile",
            query: {userId: this.props.thought.creator}
        }, '/profile')
    }

    render() {
        if (this.props.thought === null) {
            return(<div></div>)
        }
        
        const {comments, createdAt, createdBy, creator, message, shares} = this.props.thought

        const dateStr = createdAt.split("+")[0]
        const date = new Date(dateStr)
        const distance = moment(date).fromNow()
        console.log(distance)


        const options = [
            {key: "delete", text: `Delete ${this.props.isComments ? "Comment" : "Thought"}`, value: "delete", icon: "delete"},
            {key: "edit", text: `Edit ${this.props.isComments ? "Comment" : "Thought"}`, value: "edit", icon: "edit"} 
        ]

        return(
            <div key={this.props.key} className={styles.thought} onClick={this.thoughtClicked}>
                <Container text>
                    <div>
                        <Loader active={this.state.loading} />
                        <Image 
                            onClick={this.avatarClicked} 
                            src={this.state.avatar === "" ? 
                            '/avatar.jpeg' : 
                            `https://ipfs.io/ipfs/${this.state.avatar}` } avatar/> 
                        <span className={styles.uname}>{createdBy.username}</span> 
                        <span className={styles.handler}> @{creator} </span>
                        <span className={styles.handler}> · {distance}</span>
                        <Button.Group className={styles.headerbtn}>
                            <Dropdown
                            disabled={this.state.address != this.props.thought.creator}
                            basic
                            className='button icon'
                            floating
                            options={options}
                            trigger={<></>}
                            icon="ellipsis horizontal" 
                            text=" "
                            onClose={console.log("closed 1.")}
                            onChange={this.optionSelected}
                            selectOnNavigation={false}
                            selectOnBlur={false}
                            value=""
                            />
                        </Button.Group>
                    </div>
                    <p>
                        {message}
                    </p>
                    <div>
                        <Button.Group >
                            <Modal
                            size="tiny"
                            trigger={
                            <Button onClick={e => e.stopPropagation()} icon style={{background: "white"}}>
                                <Icon name="comment outline"/> {comments != null ? comments.length : 0} 
                            </Button>}>
                                <div className={styles.shareThoughtContainer}>
                                    <ShareThoughtView
                                    isComment={true}
                                    commentThoughtId={this.props.isComments ? "" : this.props.thought.id}
                                    ownerCommentId={this.props.isComments ? this.props.thought.id : ""}
                                    imgWidth={4}
                                    textWidth={11}
                                    placeholder={this.props.isComments ? "Reply to this comment..." : "Reply to this thought..."}
                                    />
                                </div>
                            </Modal>
                        <Button icon style={{background: "white"}}>
                            <Icon name="retweet"/> {shares != null ? shares.length : 0}
                        </Button>
                        <Button onClick={this.onClick} icon style={{background: "white"}}>
                            <Icon name={this.state.liked ? "heart" : "heart outline"}/> {this.state.likes.size === undefined ? 0 : this.state.likes.size}
                        </Button>
                        <Button icon style={{background: "white"}}>
                            <Icon name="share square outline"/>
                        </Button>
                        </Button.Group>
                </div>
                <Modal
                size="tiny"
                onClose={this.hideEditThought}
                open={this.state.editThoughtOn}>
                    <div className={styles.shareThoughtContainer}>
                        <ShareThoughtView
                        isComment={this.props.isComments}
                        isEdit={true}
                        id={this.props.thought.id}
                        commentThoughtId={this.props.isComments ? "" : this.props.thought.id}
                        ownerCommentId={this.props.isComments ? this.props.thought.id : ""}
                        imgWidth={4}
                        textWidth={11}
                        message={this.props.thought.message}
                        />
                    </div>
                </Modal>
                <Divider/>
                </Container>
            </div>
        )
    }
}