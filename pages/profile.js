import {Component} from 'react'
import Layout from '../components/Layout'
import ProfileView from '../components/Profile'
import Feed from '../components/Feed'

export default class Profile extends Component {
    render() {
        return(
            <Layout>
                <ProfileView/>
                <Feed isProfile={true} />
            </Layout>
        )
    }
}