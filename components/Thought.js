import { Component } from 'react'
import {Button, Container, Divider, Dropdown, Icon, Image, Modal} from 'semantic-ui-react'
import ShareThoughtView from './ShareThoughtView'
import styles from './Thought.module.css'
import moment from 'moment'

export default class Thought extends Component {
    state = {
        likes: 931,
        liked: false
        //likeIcon: 'heart outline'
    }

    onClick = async () => {
/*         if (this.state.liked) {
            console.log("true")
            this.setState({likes:this.state.likes--, liked: !this.state.liked})
        } else {
            console.log("false")
            this.setState({likes:this.state.likes++, liked: !this.state.liked})
        } */
        this.setState({likes: this.state.liked ? 931 : 932, liked: !this.state.liked})
        //this.setState({likes: 932, liked: true})
    }

    render() {
        const {comments, createdAt, createdBy, creator, likes, message, shares} = this.props.thought
        console.log(createdAt.split("+")[0])
        const time = moment(createdAt.split("m")[0], "`YYYY-MM-DDTHH:mm:ss.sssZ").fromNow()
        console.log(time)
        const options = [
            {key: "follow", text: `Follow ${createdBy.username}`, value: "follow", icon: "add user"},
            {key: "mute", text: `Mute ${createdBy.username}`, value: "mute", icon: "volume off"}
        ]
        return(
            <div className={styles.thought}>
                <Container text>
                    <div>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' avatar/> 
                        <span className={styles.uname}>{createdBy.username}</span> 
                        <span className={styles.handler}> @{creator} </span>
                        <span className={styles.handler}> · 3h</span>
                        <Button.Group className={styles.headerbtn}>
                            <Dropdown
                            basic
                            className='button icon'
                            floating
                            options={options}
                            trigger={<></>}
                            icon="ellipsis horizontal" 
                            text=" "
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
                            <Button icon style={{background: "white"}}>
                                <Icon name="comment outline"/> {comments != null ? comments.length : 0} 
                            </Button>}>
                                <div className={styles.shareThoughtContainer}>
                                    <ShareThoughtView
                                    imgWidth={4}
                                    textWidth={11}
                                    placeholder={"Reply to this thought..."}
                                    />
                                </div>
                            </Modal>
                        <Button icon style={{background: "white"}}>
                            <Icon name="retweet"/> {shares != null ? shares.length : 0}
                        </Button>
                        <Button onClick={this.onClick} icon style={{background: "white"}}>
                            <Icon name={this.state.liked ? "heart" : "heart outline"}/> {likes != null ? likes.length : 0}
                        </Button>
                        <Button icon style={{background: "white"}}>
                            <Icon name="share square outline"/>
                        </Button>
                        </Button.Group>
                </div>
                <Divider/>
                </Container>
            </div>
        )
    }
}