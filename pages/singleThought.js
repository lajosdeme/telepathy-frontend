import { Component } from "react";
import Thought from '../components/Thought'
import Feed from '../components/Feed'
import Layout from "../components/Layout";
import { withRouter } from 'next/router'
import API from '../services/api'
import Wallet from '../services/wallet'
import {SigningCosmosClient} from '@cosmjs/launchpad'
import { Header, Container } from "semantic-ui-react";


class SingleThought extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            isComments: false,
            thought: [],
            comment: [],
            key: ""
        }
    }

    async componentDidMount() {
        this.setState({loading: true})
        const thoughtId = this.props.router.query.thoughtId
        const isComments = this.props.router.query.isComments
        const key = this.props.router.query.key

        if (isComments) {
            await API.main.getComment(thoughtId).then(comment => {
                this.setState({loading: false, comment: [comment], key: key, isComments: true})
            })
        } else {
            await API.main.getThought(thoughtId).then(thought => {
                this.setState({loading: false, thought: [thought], key: key, isComments: false}) 
            }) 
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.key != this.props.router.query.key) {
            const thoughtId = this.props.router.query.thoughtId
            const isComments = this.props.router.query.isComments
            const key = this.props.router.query.key

            if (isComments) {
                console.log("is comments: ", isComments, thoughtId)
                await API.main.getComment(thoughtId).then(comment => {
                    this.setState({loading: false, comment: [comment], key: key, isComments: true})
                })
            } else {
                await API.main.getThought(thoughtId).then(thought => {
                    this.setState({loading: false, thought: [thought], key: key, isComments: false}) 
                }) 
            }
        }
    }


    render() {
        if (!this.state.isComments) {
            return(
                <div key={Math.random().toString(36).substring(7)}>
                    <Layout>
                        {this.state.thought.map(thought => {
                            return <Thought key={Math.random().toString(36).substring(7)} thought={thought} isComments={false} />
                        })}
                        <Container>
                        <Header as="h2">Comments</Header>
                        <Feed isComments={true} thoughtId={this.props.router.query.thoughtId}/>
                        </Container>
                    </Layout>
                </div>
            )
        } else {
            return(
                <div key={Math.random().toString(36).substring(7)}>
                    <Layout>
                        {this.state.comment.map(comment => {
                            return <Thought key={Math.random().toString(36).substring(7)} thought={comment} isComments={true} />
                        })}
                        <Container>
                        <Header as="h2">Comments</Header>
                        <Feed isComments={true} comments={this.state.comment[0].comments} thoughtId={null} commentId={this.props.router.query.thoughtId}/>
                        </Container>
                    </Layout>
                </div>
            )
        }
    }
}
export default withRouter(SingleThought)