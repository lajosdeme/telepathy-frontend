import {Component} from 'react'
import {Container} from 'semantic-ui-react'
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
            thoughts: []
        }
    }

    async componentDidMount() {
        await API.main.listAllThoughts().then((thoughts) => {
            this.setState({isLoaded: true, thoughts: thoughts})
            console.log(thoughts)
        })
    }

    render() {
        return(
            <div className={styles.feed}>
                <div hidden={this.props.isProfile} className={styles.shareThoughtContainer}>
                    <ShareThoughtView
                    imgWidth={2}
                    textWidth={7}
                    placeholder={"Share your thoughts..."}
                    />
                </div>
                {this.state.thoughts.map(thought => {
                    return <Thought thought={thought} />
                })}
            </div>
        )
    }
}