import {Component} from 'react'
import TextareaAutoresize from 'react-textarea-autosize'
import { Grid, Image, Button, Loader } from 'semantic-ui-react'
import styles from './ShareThoughtView.module.css'
import API from '../services/api'
import { SigningCosmosClient } from '@cosmjs/launchpad'
import Wallet from  '../services/wallet'
import Events from '../config/events'

export default class ShareThoughtView extends Component {
    //4, 11

    constructor() {
        super()
        this.state = {
            isEdit: false,
            isComment: false,
            commentThoughtId: "",
            ownerCommentId: "",
            client: SigningCosmosClient,
            message: "",
            loading: false,
            avatar: ""
        }
    }

    async componentDidMount() {
        const address = localStorage.getItem("address")
        const wallet = await Wallet.main.importExisting(localStorage.getItem("mnemonic"))
        const client = new SigningCosmosClient("http://localhost:1317/", address, wallet)
        this.setState({
            client: client, 
            isEdit: this.props.isEdit,
            isComment: this.props.isComment, 
            commentThoughtId: this.props.commentThoughtId, 
            ownerCommentId: this.props.ownerCommentId, 
            message: this.props.message != undefined ? this.props.message : ""
        })

        await API.main.getAvatar(address).then(avatar => {
            this.setState({avatar: avatar})
        }).catch(err => {
            this.setState({avatar: ""})
        })
    }

    newThoughtChanged = (e) => {
        e.stopPropagation()
        this.setState({message: e.target.value})
    }

    shareThought = async (e) => {
        e.stopPropagation()
        this.setState({loading: true})
        if (this.state.isComment) {
            const result = this.state.isEdit ? 
                await API.main.setComment(this.state.client, this.props.id, this.state.message, this.state.commentThoughtId, this.props.ownerCommentId) :
                await API.main.createComment(this.state.client, this.state.commentThoughtId, this.props.ownerCommentId, this.state.message)
            this.setState({message: "", loading: false})
            const event = new Event(Events.reloadFeed)
            document.dispatchEvent(event)
        } else {
            const result = this.state.isEdit ? 
                await API.main.setThought(this.state.client, this.state.message, this.props.id) : 
                await API.main.createThought(this.state.client, this.state.message)
            this.setState({message: "", loading: false})
            const event = new Event(Events.reloadFeed)
            document.dispatchEvent(event)
        }
    }

    render() {
        return(
            <div className={styles.container}>
                
                <div className={styles.grid}>
                <Grid centered columns={2}>
                    <Grid.Column centered width={this.props.imgWidth}>
                        <Image src={this.state.avatar === "" ? 
                        '/avatar.jpeg' : 
                        `https://ipfs.io/ipfs/${this.state.avatar}` } circular size="tiny"/>
                    </Grid.Column>
                    <Grid.Column width={this.props.textWidth}>
                        <TextareaAutoresize
                        minRows={5}
                        maxRows={10} 
                        className={styles.textView}
                        placeholder={this.props.placeholder}
                        onChange={this.newThoughtChanged}
                        onClick={e => e.stopPropagation()}
                        value={this.state.message}
                        />
                        <div className={styles.btnCon}>
                            <Button.Group >
                                <Button onClick={e => e.stopPropagation()} style={{background: "white"}} icon="image outline"/>
                            </Button.Group>
                            <Button color="twitter" onClick={this.shareThought}>{this.state.isEdit ? "Save" : "Share"}</Button>
                        </div>
                    </Grid.Column>
                </Grid>
                </div>
                <Loader active={this.state.loading}/>
            </div>
        )
    }
}