import React, {Component} from 'react'
import classes from './TitleEdit.module.css'

import _stringUtils from '../../../Utils/string.utils'

class TitleEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: {
                titleString: this.props.titleFromParent,
                titleSlug: ''
            },
            saveBtnState: false,
            jsonResponse: this.props.jsonFromParent
        }
    }

    componentDidMount() {
        this.loadTitleString(this.state.title.titleString)
        const newSlug = this.detectDatabaseEntries(_stringUtils.parseIntoSlug(this.state.title.titleString))
        this.setState({title: {titleString: this.state.title.titleString, titleSlug: newSlug}})
    }

    // * Input Events
    loadTitleString = (titleString): void => {
        document.getElementById('titleInput').value = titleString
        const newSlug = this.detectDatabaseEntries(_stringUtils.parseIntoSlug(titleString))
        this.setState({title: {titleSlug: newSlug}})
    }

    detectInputLength = (e): void => {
        const inputLen = e.target.value.length
        if (inputLen < 1) {
            this.setState({saveBtnState: true})
        } else {
            this.setState({saveBtnState: false})
        }
    }

    detectDatabaseEntries = (inputValue: string): string => {
        const slugExists = this.state.jsonResponse.filter( slug => 
            slug.slug === inputValue
        )
        if (slugExists.length > 0) {
            const ranString = Math.random().toString(36).substring(2, 7);
            return inputValue + `-${ranString}`
        } else {
            return inputValue
        }
    }

    generateSlug = (e) => {
        const newSlug = this.detectDatabaseEntries(_stringUtils.parseIntoSlug(e.target.value))
        this.setState({title: {titleString: e.target.value, titleSlug: newSlug}})
    }

    // * Click Events
    discardTitleChange = () => {
        this.props.changeToStaticModeFromChild()
    }

    saveButtonHandler = () => {
        // mock Push APi 
        this.state.jsonResponse.push(
            {
                title: this.state.title.titleString,
                slug: this.state.title.titleSlug
            }
        )
        this.props.saveTitleFromChild(this.state.title)
    }

    render() {
        return (
            <div className={classes.title}>
                <div 
                    className={classes.discardBtn} 
                    onClick={this.discardTitleChange}
                >
                    <img src="https://svgshare.com/i/7ok.svg" alt='' />
                </div>
                <button 
                    disabled={this.state.saveBtnState} 
                    className={classes.saveBtn} 
                    onClick={this.saveButtonHandler} 
                >
                    <img src="https://svgshare.com/i/7oZ.svg" alt='' />
                </button>
                <div className={classes.articleTitle}>
                    <input 
                        id="titleInput" 
                        type="text" 
                        onChange={this.detectInputLength} 
                        onKeyUp={this.generateSlug}
                    />
                    <div className={classes.titleSlug}><span>slug:</span> {this.state.title.titleSlug}</div>
                </div>
            </div>
        )
    }
}

export default TitleEdit