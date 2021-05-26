import {Component} from 'react'
import {List, Image} from 'semantic-ui-react'
import UserListItem from './UserListItem'

export default class UserList extends Component {
    render() {
        return(
            <List divided >
                <List.Header as="h3">Followers</List.Header>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
                <UserListItem/>
            </List>
        )
    }
}