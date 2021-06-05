import {Component} from 'react'
import { Button, Form, Image, Modal, Header} from 'semantic-ui-react'
import TextareaAutoresize from 'react-textarea-autosize'
import Events from '../config/events'

//props: placeholder, avatar, username, bio,
export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: "",
            username: "",
            bio: ""
        }

    }
    async componentDidMount() {
        this.setState({avatar: this.props.avatar, username: this.props.username, bio: this.props.bio})
    }

    usernameChanged = (e) => {
        this.setState({username: e.target.value})
        const event = new CustomEvent(Events.usernameChanged, {detail: e.target.value})
        document.dispatchEvent(event)
    }

    bioChanged = (e) => {
        this.setState({bio: e.target.value})
        const event = new CustomEvent(Events.bioChanged, {detail: e.target.value})
        document.dispatchEvent(event)
    }

    saveTapped = (e) => {
        const event = new Event(Events.saveTapped)
        document.dispatchEvent(event)
    }

    render() {
        return(
            <div>
                <Modal.Content>
                    <Image src={this.state.avatar === "" ? '/avatar.jpeg' : `https://ipfs.io/ipfs/${this.state.avatar}`} circular centered size="small"/>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input onChange={this.usernameChanged} placeholder='Username' value={this.state.username} />
                            </Form.Field>
                            <Form.Field>
                            <label>Bio</label>
                            <TextareaAutoresize
                            minRows={3}
                            maxRows={10} 
                            placeholder={this.props.placeholder}
                            value={this.state.bio}
                            style={{resize: "none"}}
                            onChange={this.bioChanged}
                            />
                        </Form.Field>
                        <div style={{marginTop: "15px", marginBottom: "15px", textAlign:"center"}}>
                            <Button color="twitter" type='submit' onClick={this.saveTapped}>Save</Button>
                        </div>
                    </Form> 
                </Modal.Content>
            </div>
        )
    }
}
