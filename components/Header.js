import {Component, React} from 'react'
import {Button, Input, Divider, Grid, Header} from 'semantic-ui-react'
import Link from 'next/link'

export default class MenuItem extends Component {

    logout = () => {
        localStorage.removeItem("address")
        localStorage.removeItem("mnemonic")
    }

    render() {
        return(
            <div>
                <Grid style={{marginTop: '10px'}}>
                    <Grid.Row  columns={5} only="computer tablet">
                        <Grid.Column>
                            <Header as="h1">Telepathy</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Link href={{pathname: "/", query: {loggedIn: this.props.loggedIn}}, "/"}>
                            <Button basic style={{boxShadow: '0 0 0 0px', fontWeight: this.props.home ? "bold": "normal"}}>Home</Button>  
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link href={{pathname: "/profile", query: {loggedIn: this.props.loggedIn}}, "/profile"}>
                            <Button basic style={{boxShadow: '0 0 0 0px', fontWeight: this.props.profile ? "bold": "normal"}}>Profile</Button> 
                            </Link>
                            
                        </Grid.Column>
{/*                         <Grid.Column>
                            <Input icon='search' placeholder='Search...' />
                        </Grid.Column> */}
                        <Grid.Column>
                            <Link href={{pathname: "/welcome", query: {loggedIn: this.props.loggedIn}}, "/welcome"}>
                                <Button onClick={this.logout} basic style={{boxShadow: '0 0 0 0px'}}>Logout</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4} only="mobile">
                        <Grid.Column>
                            <Link href={{pathname: "/", query: {loggedIn: this.props.loggedIn}}, "/"}>
                            <Button style={{background: "white", color: this.props.home ? "black" : "grey"}} icon="home"/> 
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link href={{pathname: "/profile", query: {loggedIn: this.props.loggedIn}}, "/profile"}>
                            <Button style={{background: "white", color: this.props.profile ? "black" : "grey"}} icon="user"/> 
                            </Link>
                        </Grid.Column>
                        <Grid.Column>
                            <Link href={{pathname: "/welcome", query: {loggedIn: this.props.loggedIn}}, "/welcome"}>
                            <Button style={{background: "white"}} icon="sign-out"/>  
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

    {/*              <Menu style={{marginTop: '10px'}} secondary stackable>
                    <Menu.Item header>Telepathy</Menu.Item>
                    <Menu.Item name="home">Home</Menu.Item>
                    <Menu.Item name="profile">Profile</Menu.Item>
                    <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item name='logout'>Logout</Menu.Item>
                    </Menu.Menu>
                </Menu>  */}
                <Divider/>
            </div>

        )
    }
}