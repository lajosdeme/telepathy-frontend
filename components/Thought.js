import { Component } from 'react'
import {Button, Container, Divider, Dropdown, Icon, Image, Modal} from 'semantic-ui-react'
import ShareThoughtView from './ShareThoughtView'
import styles from './Thought.module.css'

export default class Thought extends Component {
    state = {
        likes: 931,
        liked: false
        //likeIcon: 'heart outline'
    }

    onClick = () => {
/*         if (this.state.liked) {
            console.log("true")
            this.setState({likes:this.state.likes--, liked: !this.state.liked})
        } else {
            console.log("false")
            this.setState({likes:this.state.likes++, liked: !this.state.liked})
        } */
        this.setState({likes: this.state.liked ? 931 : 932, liked: !this.state.liked})
        console.log(this.state.likes)
        //this.setState({likes: 932, liked: true})
    }

    render() {
        const options = [
            {key: "follow", text: "Follow @patrick", value: "follow", icon: "add user"},
            {key: "mute", text: "Mute @patrick", value: "mute", icon: "volume off"}
        ]
        return(
            <div className={styles.thought}>
                <Container text>
                    <div>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' avatar/> 
                        <span className={styles.uname}>Patrick</span> 
                        <span className={styles.handler}> @patrick </span>
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
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                        Donec quam felis
                    </p>
                    <div>
                        <Button.Group >
                            <Modal
                            size="tiny"
                            trigger={
                            <Button icon style={{background: "white"}}>
                                <Icon name="comment outline"/> 10 
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
                            <Icon name="retweet"/> 23
                        </Button>
                        <Button onClick={this.onClick} icon style={{background: "white"}}>
                            <Icon name={this.state.liked ? "heart" : "heart outline"}/> {this.state.likes}
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