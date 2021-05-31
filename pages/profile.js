import {Component} from 'react'
import Layout from '../components/Layout'
import ProfileView from '../components/Profile'
import Feed from '../components/Feed'
import Router, {withRouter} from 'next/router'

class Profile extends Component {
    componentDidMount() {
        if (localStorage.getItem("address") === null) {
            Router.push("/welcome")
        } else {
            this.props.router.query.loggedIn = true
            this.setState({loggedIn: true})
        }
    }

    render() {
        if (this.props.router.query.loggedIn != true) {
            return(<div></div>)
        }
        return(
            <Layout profile={true} loggedIn={this.props.router.query.loggedIn}>
                <ProfileView  userId={this.props.router.query.userId}/>
                <Feed isProfile={true} userId={this.props.router.query.userId} />
            </Layout>
        )
    }
}
export default withRouter(Profile)