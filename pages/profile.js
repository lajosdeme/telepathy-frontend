import {Component} from 'react'
import Layout from '../components/Layout'
import ProfileView from '../components/Profile'
import Feed from '../components/Feed'

export default class Profile extends Component {
    render() {
        return(
            <Layout profile={true}>
                <ProfileView userId={"cosmos1kw4ngcavxd2s60zkms3vxkwu77y60vlvn89ztr"}/>
                <Feed isProfile={true} />
            </Layout>
        )
    }
}