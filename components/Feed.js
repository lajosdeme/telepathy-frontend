import {Component} from 'react'
import {Button, Grid, Modal, Popup} from 'semantic-ui-react'
import styles from './Feed.module.css'
import Thought from './Thought'
import ShareThoughtView from './ShareThoughtView'
import API from '../services/api'
import Wallet from '../services/wallet'
import {SigningCosmosClient} from '@cosmjs/launchpad'
import EditProfile from './EditProfile'
import Events from '../config/events'


export default class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isComments: false,
            thoughts: [],
            isUserNull: false,
            username: "",
            bio: "",
            client: null
        }
    }

    async componentDidMount() {
        await this.reloadFeed()
        await API.main.getProfile(localStorage.getItem("address")).catch(async err => {
            const address = localStorage.getItem("address")
            console.log(address)
            const wallet = await Wallet.main.importExisting(localStorage.getItem("mnemonic"))
            const client = new SigningCosmosClient("http://localhost:1317/", address, wallet)

            this.setState({isUserNull: true, client: client})

            document.addEventListener(Events.usernameChanged, this.usernameChanged)
            document.addEventListener(Events.bioChanged, this.bioChanged)
            document.addEventListener(Events.saveTapped, this.saveTapped)
        })
        document.addEventListener(Events.reloadFeed, this.reloadFeed)
    }

    componentWillUnmount() {
        document.removeEventListener(Events.usernameChanged, this.usernameChanged)
        document.removeEventListener(Events.bioChanged, this.bioChanged)
        document.removeEventListener(Events.saveTapped, this.saveTapped)
    }

    usernameChanged = (e) => {
        const uname = e.detail
        this.setState({username: uname})
    }

    bioChanged = (e) => {
        const bio = e.detail
        this.setState({bio: bio})
    }

    saveTapped = async () => {
        this.setState({loading: true})
        console.log("save tapped...")

        await API.main.createUser(this.state.client, this.state.username, this.state.bio).then(user => {
            console.log(user)
            this.setState({isUserNull: false, loading: false})
        }).catch(err => {
            alert(err)
            this.setState({loading: false})
        })
    }
    
    reloadFeed = async () => {
        if (this.props.isProfile) {
            const address = localStorage.getItem("address")
            //feed is on user profile, list thoughts
            await API.main.listThoughtsByCreator(address).then((thoughts) => {
                this.setState({isLoaded: true, thoughts: thoughts === null ? [] : thoughts})
            })
        } 
        else if (this.props.isComments && this.props.thoughtId != null) {
            //feed is under a thought, list comments for it
            await API.main.listCommentsForThought(this.props.thoughtId).then((comments) => {
                this.setState({isLoaded: true, thoughts: comments === null ? [] : comments})
            })
        }
        else if (this.props.isComments && this.props.commentId != null) {
            //feed is comments under a comment, list them
            await API.main.listCommentsForComment(this.props.commentId).then(comments => {
                this.setState({isLoaded: true, thoughts: comments === null ? [] : comments})
            })
        }
        else {
            //feed is on the main page, list all thoughts
            await API.main.listAllThoughts().then((thoughts) => {
                this.setState({isLoaded: true, thoughts: thoughts === null ? [] : thoughts})
            })
        }
    }

    render() {
        return(
            <div className={styles.feed}>
                <div hidden={!this.props.isProfile}>
                    <Grid textAlign="center" className={styles.importBtn}>
                        <Popup 
                        content="Import your tweets as thoughts from Twitter into Telepathy. (Not implemented yet.)" 
                        trigger={<Button floated="right" size="tiny" color="twitter">Import your tweets from Twitter</Button>} 
                        />
                    </Grid>
                </div>

                <div hidden={this.props.isProfile || this.props.isComments} className={styles.shareThoughtContainer}>
                    <ShareThoughtView
                    imgWidth={2}
                    textWidth={7}
                    placeholder={"Share your thoughts..."}
                    />
                </div>
                {
                this.state.thoughts.reverse().map(thought => {
                    return <Thought thought={thought} isComments={this.props.isComments} />
                })}
                <Modal  size="small" open={this.state.isUserNull}>
                    <Modal.Header>Let's start by creating a username and bio.</Modal.Header>
                    <EditProfile username="" bio="" avatar=""/>
                </Modal>
            </div>
        )
    }
}