import {Component} from 'react'
import { Button, Container, Divider, Form, Grid, Header, Popup, Image, Label, Loader, Modal } from 'semantic-ui-react'
import TextareaAutoresize from 'react-textarea-autosize'
import UserList from './UserList'
import API from '../services/api'
import Wallet from '../services/wallet'
import Ipfs from '../services//ipfs'
import {SigningCosmosClient} from '@cosmjs/launchpad'

export default class ProfileView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOwner: true,
            showUserList: false,
            loading: false,
            client: SigningCosmosClient,
            username: "",
            bio: "",
            user: {},
            exists: true,
            isFollowers: true,
            userListUsers: [],
            following: true,
            avatar: ""
        }
    }

    async componentDidMount() {
        this.fileSelector = this.buildFileSelector()

        this.setState({loading: true})
        const address = localStorage.getItem("address")
        const wallet = await Wallet.main.importExisting(localStorage.getItem("mnemonic"))
        const client = new SigningCosmosClient("http://localhost:1317/", address, wallet)
        const isOwner = this.props.userId === undefined || this.props.userId === address
        const profileId = isOwner ? address : this.props.userId

        await API.main.getProfile(profileId).then((user) => {
            const {username, creator, bio} = user
            const following = user.followers != undefined && user.followers.map(user => user.id).includes(address)
            this.setState({
                loading: false, 
                client: client, 
                username: username, 
                creator: creator, 
                bio: bio, 
                user: user, 
                isOwner: isOwner, 
                following: following, 
                avatar: user.avatar})
        }).catch(err => {
            this.setState({loading: false, client: client, exists: false})
            console.log(err)
        })
    }

    showFollowers = () => {
        this.setState({showUserList: !this.state.showUserList, userListUsers: this.state.user.followers, isFollowers: true})
    }
    showFollowings = () => {
        this.setState({showUserList: !this.state.showUserList, userListUsers: this.state.user.following, isFollowers: false})
    }

    usernameChanged = (e) => {
        this.setState({username: e.target.value})
    }

    bioChanged = (e) => {
        this.setState({bio: e.target.value})
    }

    getUserId = () => {
        return this.state.user.id
    }

    followAction = async () => {
        this.setState({loading: true})
        if (this.state.following) {
            await API.main.unfollowUser(this.state.client, this.state.user.id).then(async res => {
                await API.main.getProfile(this.state.user.id).then(user => {
                    this.setState({following: !this.state.following, user: user, loading: false})
                }).catch(err => {
                    alert(err)
                    this.setState({loading: false})
                })
            })
        } else {
            await API.main.followUser(this.state.client, this.state.user.id).then(async res => {
                await API.main.getProfile(this.state.user.id).then(user => {
                    this.setState({following: !this.state.following, user: user, loading: false})
                }).catch(err => {
                    alert(err)
                    this.setState({loading: false})
                })
            })
        }
    }

    setEditProfile = async () => {
        this.setState({loading: true})
        if (!this.state.exists) {
            await API.main.createUser(this.state.client, this.state.username, this.state.bio).then(user => {
                this.setState({user: user, loading: false})
            }).catch(err => {
                alert(err)
                this.setState({loading: false})
            })
        } else {
            await API.main.setUser(this.state.client, this.state.username, this.state.bio).then(res => {
                let user = this.state.user
                user.username = this.state.username
                user.bio = this.state.bio
                this.setState({user: user, loading: false})
            }).catch(err => {
                alert(err)
                this.setState({loading: false})
            })
        }
    }

    resetUser = () => {
        const user = this.state.user
        this.setState({username: user.username, bio: user.bio})
    }

    openFileSelect = () => {
        if (this.state.isOwner)
        this.fileSelector.click()
    }

    buildFileSelector = () => {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('accept', 'image/*')
    
        fileSelector.addEventListener('input', async (e) => {
            this.setState({loading: true})
            const {files} = e.target
            const img = files[0]
            const hash = await Ipfs.addFile(img)
    
            await API.main.setAvatar(this.state.client, this.state.user.id, hash).then(res => {
                this.setState({loading: false, avatar: hash})
            }).catch(err => {
                this.setState({loading: false})
            })
        })

        return fileSelector;
    }

    render() {
        const {followers, following} = this.state.user
        return(
            <div>
                <Loader active={this.state.loading}/>
                <Container textAlign="center"> 
                <Popup 
                    content="Tap to edit." 
                    trigger={<Image onClick={this.openFileSelect} style={{background: "grey"}} src={this.state.avatar === "" ? '/avatar.jpeg' : `https://ipfs.io/ipfs/${this.state.avatar}`} circular centered size="small"/>} 
                />             
                    <Header as="h2" style={{marginBottom: '0px'}}>{this.state.user.username}</Header>
                    <Header sub style={{marginTop: '0px'}}>@{this.state.user.creator}</Header>
                    <Label basic pointing>
                        {this.state.user.bio}
                    </Label>
                    <Grid textAlign="center">
                        <Grid.Column only="tablet computer" width={2}>
                            <Button icon style={{background: "white"}} onClick={this.showFollowers}>{followers != null ? followers.length : 0} followers</Button>
                        </Grid.Column>
                        <Grid.Column only="tablet computer" width={2}>
                            <Button icon style={{background: "white"}} onClick={this.showFollowings}>{following != null ? following.length : 0} following</Button>
                        </Grid.Column>
                        <Grid.Column only="mobile" width={5}>
                            <Button icon style={{background: "white"}} onClick={this.showFollowers}>{followers != null ? followers.length : 0} followers</Button>
                        </Grid.Column>
                        <Grid.Column only="mobile" width={5}>
                            <Button icon style={{background: "white"}} onClick={this.showFollowings}>{following != null ? following.length : 0}  following</Button>
                        </Grid.Column>
                    </Grid>
                    <div style={{marginTop: "15px", marginBottom: "15px"}} hidden={!this.state.isOwner}>
                        <Modal
                        size="small"
                        trigger={<Button basic color="blue">Edit profile</Button>}
                        onClose={this.resetUser}
                        >
                            <Modal.Header>Edit profile</Modal.Header>
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
                                    <div style={{textAlign:"center"}}>
                                        <Button color="twitter" type='submit' onClick={this.setEditProfile}>Save</Button>
                                    </div>
                                </Form> 
                            </Modal.Content>
                        </Modal>
                    </div>
                    <div hidden={this.state.isOwner}>
                        <Button.Group>
                            <Button 
                            onClick={this.followAction}
                            basic={!this.state.following} 
                            color="blue">{this.state.following ? "Following" : "Follow"}</Button>
                        </Button.Group>
                    </div>
                    <Divider/>
                </Container>

                <Modal
                closeIcon
                onClose={this.showFollowers}
                open={this.state.showUserList}
                size="small"
                >
                    <Modal.Content>
                        <UserList isFollowers={this.state.isFollowers} users={this.state.userListUsers} following={this.state.user.following}/>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}