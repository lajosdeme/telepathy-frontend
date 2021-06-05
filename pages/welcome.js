import React, {Component} from 'react'
import { Button, Container, Header, Input, Modal, Message, Image } from 'semantic-ui-react'
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
                        <Image size="small" src="/telepathy_logo.png" centered />
                        <Header as="h1">Telepathy
                        <Header.Subheader>
                        Decentralized microblogging platform built on the blockchain
                        </Header.Subheader>
                        </Header>
                        <Modal
                        closeIcon
                        trigger={<div className={styles.buttonContainer}><Button color="twitter" className={styles.welcomeButton}>Create a Telepathy Wallet</Button></div>}
                        >
                            <Modal.Content>
                                <Modal.Description>
                                    <Header as="h3">Installation</Header>
                                    <p>Make sure <b>Go 1.15+</b> is installed on your workstation.</p>
                                    <p>If you want to test locally make sure <b>starport</b> is also installed.</p>
                                    <p>Make sure you have <b>IPFS</b> installed for uploading profile pictures.</p>
                                    <br></br>
                                    <p>Clone the main repo:</p>
                                    <Message color="black">git clone github.com/lajosdeme/Telepathy.git</Message>
                                    <p>Run the makefile:</p>
                                    <Message color="black">cd telepathy && make</Message>
                                    <p>Init the config files:</p>
                                    <Message color="black">$ sh scripts/start.sh</Message>
                                    <div>
                                    <span>Set your nginx sever to reverse proxy the request for telepathy by adding the contents from </span>
                                    <span><Message color="black" compact> scripts/nginx.conf </Message></span>
                                    <span> to your config file.</span>
                                    </div>
                                    <br></br>
                                    <p>Start a local IPFS daemon: </p>
                                    <Message color="black">$ ipfs daemon</Message>
                                    <br></br>
                                    <Header as="h3">Running the node</Header>
                                    <div>
                                     <span><p>Initialize the genesis and create test accounts by running </p></span>  
                                     <span> <Message color="black" compact> $ starport serve</Message></span> 
                                     <p>(Make sure to write down the mnemonic created here to log in to the frontend with these wallets.)</p>
                                    </div>
                                    <br></br>
                                    <p>Now if you want to run manually you can spin up your node by running:</p>
                                    <Message color="black">$ telepathyd start</Message>
                                    <br></br>
                                    <p>and the rest server: </p>
                                    <Message color="black">$ telepathycli rest-server --chain-id telepathy --trust-node --unsafe-cors</Message>
                                    <br></br>
                                    <Header as="h3">Experiment with the CLI</Header>
                                    <p>During the config process two test wallets are created with the names <i>alice</i> and <i>bob</i>. Start by creating a user profile for one or both of them on Telepathy.</p>
                                    <Message color="black">$ telepathycli tx telepathy create-user "alice" "This is a short bio for alice" --from alice </Message>
                                    <p>Post your first thought</p>
                                    <Message color="black">$ telepathycli tx telepathy create-thought "Posting my first thought on Telepathy" --from alice</Message>
                                    <br></br>
                                    <Header as="h3">Creating a new wallet</Header>
                                    <p>A new wallet can be created by:</p>
                                    <Message color="black">$ telepathycli keys add walletnew </Message>
                                    <p>Send some tokens to it before you can use it:</p>
                                    <Message color="black">$ telepathycli tx send $FROM_ADDRESS $RECIPIENT $VALUE</Message>
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