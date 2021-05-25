import {Component} from 'react'
import TextareaAutoresize from 'react-textarea-autosize'
import { Grid, Image, Button } from 'semantic-ui-react'
import styles from './ShareThoughtView.module.css'

export default class ShareThoughtView extends Component {
    //4, 11
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.grid}>
                <Grid centered columns={2}>
                    <Grid.Column centered width={this.props.imgWidth}>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/patrick.png' circular size="tiny"/>
                    </Grid.Column>
                    <Grid.Column width={this.props.textWidth}>
                        <TextareaAutoresize
                        minRows={5}
                        maxRows={10} 
                        className={styles.textView}
                        placeholder={this.props.placeholder}
                        />
                        <div className={styles.btnCon}>
                            <Button.Group >
                                <Button style={{background: "white"}} icon="image outline"/>
                            </Button.Group>
                            <Button color="twitter">Share</Button>
                        </div>
                    </Grid.Column>
                </Grid>
                </div>
            </div>
        )
    }
}