import {Component} from 'react'
import {List, Image, Button} from 'semantic-ui-react'
import  styles from './UserListItem.module.css'
import API from '../services/api'
import Wallet from '../services/wallet'
import {SigningCosmosClient} from '@cosmjs/launchpad'

export default class UserListItem extends Component {
    constructor() {
        super()
        this.state = {
            following: false,
            avatar: ""
        }
    }

    async componentDidMount() {
        this.setState({following: this.props.following})

        await API.main.getAvatar(this.props.user.id).then(avatar => {
            this.setState({avatar: avatar})
        }).catch(err => {
            this.setState({avatar: ""})
        })
    }

    onClick = async () => {
        const address = localStorage.getItem("address")
        const wallet = await Wallet.main.importExisting(localStorage.getItem("mnemonic"))
        const client = new SigningCosmosClient("http://localhost:1317/", address, wallet)

        if (this.state.following) {
            await API.main.unfollowUser(client, this.props.user.id).then(res => {
                this.setState({following: !this.state.following})
            }).catch(err => {
                alert(err)
            })
        } else {
            await API.main.followUser(client, this.props.user.id).then(res => {
                this.setState({following: !this.state.following})
            }).catch(err => {
                alert(err)
            })
        }
    }

    render() {
        return(
            <List.Item>
                <div>
                <Image avatar src={this.state.avatar === "" ? '/avatar.jpeg' : `https://ipfs.io/ipfs/${this.state.avatar}` } />
                <span className={styles.uname}>{this.props.user.username}</span>
                <span className={styles.handler}> @{this.props.user.creator} </span>
                <span className={styles.followBtn}>
                    <Button 
                    onClick={this.onClick}
                    size="mini" 
                    basic={!this.state.following} 
                    color="blue">
                        {this.state.following ? "Following" : "Follow"}
                    </Button>
                </span>
                </div>
            <List.Content>
                <List.Description className={styles.listDesc}>
                    {this.props.user.bio}
                </List.Description>
            </List.Content>
            </List.Item>
        )
    }
}