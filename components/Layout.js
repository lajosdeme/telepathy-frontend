import React from 'react'
import Header from './Header'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Footer from './Footer'

const Layout = (props) => {
    return(
        <Container>
            <Header/>
            {props.children}
            <Footer/>
        </Container>
    )
}
export default Layout