import { Component } from 'react';
import Layout from '../components/Layout'
import Feed from '../components/Feed'
import Router, { withRouter } from 'next/router'

class HomePage extends Component {
    componentDidMount() {
        if (localStorage.getItem("address") === null) {
            Router.push("/welcome")
        }  
        else {
            this.props.router.query.loggedIn = true
            this.setState({loggedIn: true})
        }
    }
    render() {
        if (this.props.router.query.loggedIn != true) {
            return(<div></div>)
        }

        return(
            <Layout home={true} loggedIn={this.props.router.query.loggedIn}>
                <Feed />
            </Layout>
        )
    }
}

export default withRouter(HomePage)