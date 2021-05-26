import {Component} from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon, Image, Label, Modal } from 'semantic-ui-react'
import TextareaAutoresize from 'react-textarea-autosize'
import styles from './Profile.module.css'
import UserList from './UserList'
import API from '../services/api'

export default class ProfileView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOwner: true,
            showUserList: false,
            isLoaded: false,
            user: {}
        }
    }

    async componentDidMount() {
        await API.main.getProfile(this.props.userId).then((user) => {
            this.setState({isLoaded: true, user: user})
            console.log(user)
        })
    }

    setShowList = () => {
        this.setState({showUserList: !this.state.showUserList})
    }

    render() {
        const {username, creator, bio, followers, following} = this.state.user
        return(
            <div>
                <Container textAlign="center"> 
                    <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' circular centered size="small"/>               
                    <Header as="h2" style={{marginBottom: '0px'}}>{username}</Header>
                    <Header sub style={{marginTop: '0px'}}>@{creator}</Header>
                    <Label basic pointing>
                        {bio}
                    </Label>
                    <Grid textAlign="center">
                        <Grid.Column only="tablet computer" width={2}>
                            <Button icon style={{background: "white"}} onClick={this.setShowList}>{followers != null ? followers.length : 0} followers</Button>
                        </Grid.Column>
                        <Grid.Column only="tablet computer" width={2}>
                            <Button icon style={{background: "white"}} onClick={this.setShowList}>{following != null ? following.length : 0} following</Button>
                        </Grid.Column>
                        <Grid.Column only="mobile" width={5}>
                            <Button icon style={{background: "white"}} onClick={this.setShowList}>{followers != null ? followers.length : 0} followers</Button>
                        </Grid.Column>
                        <Grid.Column only="mobile" width={5}>
                            <Button icon style={{background: "white"}} onClick={this.setShowList}>{following != null ? following.length : 0}  following</Button>
                        </Grid.Column>
                    </Grid>
                    <div style={{marginTop: "15px", marginBottom: "15px"}} hidden={!this.state.isOwner}>
                        <Modal
                        size="small"
                        trigger={<Button basic color="blue">Edit profile</Button>}
                        >
                            <Modal.Header>Edit profile</Modal.Header>
                            <Modal.Content>
                                <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' circular centered size="small"/>
                                <Form>
                                    <Form.Field>
                                        <label>Username</label>
                                        <input placeholder='Username' value={username} />
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Bio</label>
                                        <TextareaAutoresize
                                        minRows={3}
                                        maxRows={10} 
                                        placeholder={this.props.placeholder}
                                        value={bio}
                                        style={{resize: "none"}}
                                        />
                                    </Form.Field>
                                    <div style={{textAlign:"center"}}>
                                        <Button color="twitter" type='submit'>Save</Button>
                                    </div>
                                </Form> 
                            </Modal.Content>
                        </Modal>
                    </div>
                    <div hidden={this.state.isOwner}>
                        <Button.Group>
                            <Button color="twitter" icon="ellipsis horizontal"/>
                            <Button color="twitter">Follow</Button>
                        </Button.Group>
                    </div>
                    <Divider/>
                </Container>

                <Modal
                closeIcon
                onClose={this.setShowList}
                open={this.state.showUserList}
                size="small"
                >
                    <Modal.Content>
                        <UserList/>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}