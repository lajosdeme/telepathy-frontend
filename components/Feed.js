import {Component, useEffect} from 'react'
import {Button, Container, Grid, Popup} from 'semantic-ui-react'
import styles from './Feed.module.css'
import Thought from './Thought'
import ShareThoughtView from './ShareThoughtView'
import API from '../services/api'


export default class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            isComments: false,
            thoughts: []
        }
    }

    async componentDidMount() {
        await this.reloadFeed()
        document.addEventListener('reloadFeed', this.reloadFeed)
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
            </div>
        )
    }
}