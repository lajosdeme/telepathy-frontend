import React, {Component} from 'react'
import { Button, Container, Header, Input, Modal } from 'semantic-ui-react'
import Layout from '../components/Layout'
import styles from './welcome.module.css'

export default class Welcome extends Component {
    render() {
        this.state = {
            open: false
        }

        return(
            <Layout>
                <div className={styles.mainContainer}>
                    <Container textAlign="center">
                        <Header as="h1">Telepathy
                        <Header.Subheader>
                        Decentralized microblogging platform built on the blockchain
                        </Header.Subheader>
                        </Header>
                        <div className={styles.buttonContainer}><Button color="twitter" className={styles.welcomeButton}>Create an address</Button></div>
                        <Modal
                        size="tiny"
                        trigger={<div className={styles.buttonContainer}><Button basic color='blue' content='Blue' className={styles.welcomeButton}>Log in</Button></div>}
                        >
                            <Modal.Content>
                                <Input className={styles.input} placeholder="Enter mnemonic (password)"/>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button className={styles.loginBtn} color="twitter">Sign in</Button>
                            </Modal.Actions>
                        </Modal>
                    </Container>
                </div>    
            </Layout>

        )
    }
}