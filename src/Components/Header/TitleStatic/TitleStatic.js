import React, { Component } from 'react'
import classes from './TitleStatic.module.css'

class TitleStatic extends Component {

    editTitleString = (): void => {
        this.props.changeToEditModeFromChild()
    }

    render() {
        return (
            <div className={classes.title}>
                <div className={classes.editTitleBtn} onClick={this.editTitleString}>
                    <img src="https://svgshare.com/i/7mt.svg" alt='' />
                </div>
                <div className={classes.articleTitle}>
                    <h1 id="titleH1">{this.props.titleFromParent}</h1>
                </div>
            </div>
        )
    }
}

export default TitleStatic