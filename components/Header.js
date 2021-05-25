import {React} from 'react'
import {Button, Input, Divider, Grid, Header} from 'semantic-ui-react'

const MenuItem = () => {
    return(
        <div>
            <Grid style={{marginTop: '10px'}}>
                <Grid.Row  columns={5} only="computer tablet">
                    <Grid.Column>
                        <Header as="h1">Telepathy</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Button basic style={{boxShadow: '0 0 0 0px'}}>Home</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Button basic style={{boxShadow: '0 0 0 0px'}}>Profile</Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Input icon='search' placeholder='Search...' />
                    </Grid.Column>
                    <Grid.Column>
                    <Button basic style={{boxShadow: '0 0 0 0px'}}>Logout</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4} only="mobile">
                    <Grid.Column>
                        <Button style={{background: "white"}} icon="home"/>
                    </Grid.Column>
                    <Grid.Column>
                        <Button style={{background: "white"}} icon="user"/>
                    </Grid.Column>
                    <Grid.Column>
                        <Button style={{background: "white"}} icon="search"/>
                    </Grid.Column>
                    <Grid.Column>
                        <Button style={{background: "white"}} icon="sign-out"/>
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

export default MenuItem