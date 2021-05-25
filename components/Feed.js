import {Component} from 'react'
import {Container} from 'semantic-ui-react'
import styles from './Feed.module.css'
import Thought from './Thought'
import ShareThoughtView from './ShareThoughtView'


export default class Feed extends Component {
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
                <Thought/>
                <Thought/>
                <Thought/>
                <Thought/>
                <Thought/>
                <Thought/>
                <Thought/>
            </div>
        )
    }
}