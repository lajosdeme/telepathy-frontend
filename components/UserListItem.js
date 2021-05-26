import {Component} from 'react'
import {List, Image, Button} from 'semantic-ui-react'
import  styles from './UserListItem.module.css'

export default class UserListItem extends Component {
    state = {
        following: false
    }

    onClick = () => {
        this.setState({following: !this.state.following})
    }

    render() {
        return(
            <List.Item>
                <div>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                <span className={styles.uname}>Daniel</span>
                <span className={styles.handler}> @patrick </span>
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
                This is the bio of the user. asd asd as as asd as asd. <br></br> 
                        asdasasasdas
                        This is the bio of the user. asd asd as as asd as asd. <br></br> 
                        asdasasasdas
                        This is the bio of the user. asd asd as as asd as asd. <br></br> 
                        asdasasasdas
                </List.Description>
            </List.Content>
            </List.Item>
        )
    }
}