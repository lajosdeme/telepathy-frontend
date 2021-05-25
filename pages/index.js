import { Component } from 'react';
import Layout from '../components/Layout'
import Feed from '../components/Feed'

export default class HomePage extends Component {
    render() {
        return(
            <Layout>
                <Feed/>
            </Layout>
        )
    }
}