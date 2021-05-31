import {Component} from 'react'
import {List, Image} from 'semantic-ui-react'
import UserListItem from './UserListItem'

export default class UserList extends Component {
    constructor() {
        super()
        this.state = {
            isFollowers: true,
            users: [],
            following: []
        }
    }
    componentDidMount() {
        const following = this.props.following != null ? this.props.following.map(user => user.id) : []
        const users = this.props.users != null ? this.props.users : []
        this.setState({isFollowers: this.props.isFollowers, users: users, following: following})
    }
    render() {
        return(
            <List divided >
                <List.Header as="h3">{this.state.isFollowers ? "Followers" : "Following"}</List.Header>
                {this.state.users.map(user => {
                    return <UserListItem user={user} following={this.state.following.includes(user.creator)}/>
                })}
            </List>
        )
    }
}