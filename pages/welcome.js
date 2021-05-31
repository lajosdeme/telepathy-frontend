import React, {Component} from 'react'
import { Button, Container, Header, Input, Modal } from 'semantic-ui-react'
import Layout from '../components/Layout'
import styles from './welcome.module.css'
import Wallet from '../services/wallet'
import Router from 'next/router'

export default class Welcome extends Component {
    constructor() {
        super()
        this.state = {
            unlocked: false,
            showRedirect: false,
            loginBtnEnabled: false,
            mnemonic: ""

        }
    }

    logIn = async () => {
        console.log("logging")
        const wallet = await Wallet.main.importExisting(this.state.mnemonic)
        const [{address}] = await wallet.getAccounts();

        localStorage.setItem("address", address)
        localStorage.setItem("mnemonic", this.state.mnemonic)

        if (wallet != null) {
            this.setState({unlocked: true})
            this.redirectHome()
        }
    }

    redirectHome = () => {
        if (this.state.unlocked) {
            Router.push({pathname: "/", query: {loggedIn: true}}, "/")
        }
    }

    handleInput(e) {
        if (this.countWords(e.target.value) === 24) {
            this.setState({loginBtnEnabled: true, mnemonic: e.target.value})
        } else {
            this.setState({loginBtnEnabled: false})
        }
    }

    countWords(str) {
        str = str.replace(/(^\s*)|(\s*$)/gi,"");
        str = str.replace(/[ ]{2,}/gi," ");
        str = str.replace(/\n /,"\n");
        return str.split(' ').length;
     }


    render() {
        return(
            <Layout loggedIn={this.state.unlocked}>
                <div className={styles.mainContainer}>
                    <Container textAlign="center">
                        <Header as="h1">Telepathy
                        <Header.Subheader>
                        Decentralized microblogging platform built on the blockchain
                        </Header.Subheader>
                        </Header>
                        <Modal
                        trigger={<div className={styles.buttonContainer}><Button color="twitter" className={styles.welcomeButton}>Create a Telepathy Wallet</Button></div>}
                        >
                            <Modal.Content>
                                <Modal.Description>
                                    <p>Please follow instructions on how to set up your wallet. (There will be a link to the docs here...)</p>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                        <Modal
                        size="tiny"
                        trigger={<div className={styles.buttonContainer}><Button basic color='blue' content='Blue' className={styles.welcomeButton}>Log in</Button></div>}
                        >
                            <Modal.Content>
                                <Input onChange={this.handleInput.bind(this)} className={styles.input} placeholder="Enter mnemonic (password)"/>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button disabled={!this.state.loginBtnEnabled} onClick={this.logIn} className={styles.loginBtn} color="twitter">Sign in</Button>
                            </Modal.Actions>
                        </Modal>

                        <Modal
                        open={this.state.showRedirect}>
                            <Modal.Content>
                                <Modal.Description>
                                    <p>This is your mnemonic. Please write down these words and store them somewehere secure. Without this you can't access your wallet.</p>
                                    <Header as="h4">{this.state.wallet != null ? this.state.wallet.mnemonic : ""}</Header>
                                    <Button onClick={this.redirectHome} className={styles.loginBtn}>I got it!</Button>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </Container>
                </div>    
            </Layout>

        )
    }
}