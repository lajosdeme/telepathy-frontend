import {Component} from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image, Label } from 'semantic-ui-react'
import styles from './Profile.module.css'

export default class ProfileView extends Component {
    //https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80

    render() {
        return(
            <div>
                <Container textAlign="center">
                    <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' circular centered size="small"/>
                <Header as="h2" style={{marginBottom: '0px'}}>Patrick</Header>
                <Header sub style={{marginTop: '0px'}}>@patrick</Header>
                <Label basic pointing>
                    This is the bio of the user. asd asd as as asd as asd. <br></br> 
                    asdasasasdas
                    This is the bio of the user. asd asd as as asd as asd. <br></br> 
                    asdasasasdas
                    This is the bio of the user. asd asd as as asd as asd. <br></br> 
                    asdasasasdas
                </Label>
                <Grid textAlign="center">
                    <Grid.Column width={2}><Button icon style={{background: "white"}}>23 followers</Button></Grid.Column>
                    <Grid.Column width={2}><Button icon style={{background: "white"}}>43 following</Button></Grid.Column>
                </Grid>
                <Divider/>
                </Container>
            </div>
        )
    }
}