import React, { Component } from 'react'
import classes from './Header.module.css'

import TitleStatic from '../../Components/Header/TitleStatic/TitleStatic'
import TitleEdit from '../../Components/Header/TitleEdit/TitleEdit'

class Header extends Component {

    constructor(props) {
        super(props)
        // get initial title from API
        const jsonResponse: Array<{}> = [
            {
                title: 'It is impossible to walk rapidly and be unhappy.', 
                slug: 'it-is-impossible-to-walk-rapidly-and-be-unhappy'
            },
            {
                title: 'We dont get offered crises, they arrive',
                slug: 'we-dont-get-offered-crises-they-arrive'
            },
            {
                title: 'Knowledge is power.',
                slug: 'knowledge-is-power'
            }
        ]
        const lastEntryInDB = jsonResponse[jsonResponse.length - 1].title

        this.state = {
            showTitle: true,
            titleString: lastEntryInDB,
            jsonResponse: jsonResponse
        }
    }

    saveTitleString = (value: string): void => {
        console.log(value)
        this.setState({titleString: value.titleString})
        this.changeTitleState()
    }

    changeTitleState = (): void => {
        const showTitle = this.state.showTitle
        this.setState({showTitle: !showTitle})
    }

    render() {
        return (
            <header>
                <nav>
                    <div className={classes.logoAndHamburger}></div>
                </nav>
                {
                    this.state.showTitle 
                    ?
                    <TitleStatic 
                        titleFromParent={this.state.titleString} // pass state to child
                        changeToEditModeFromChild={this.changeTitleState} // trigger parent method from child
                    />
                    :
                    <TitleEdit
                        titleFromParent={this.state.titleString} // pass state to child
                        jsonFromParent={this.state.jsonResponse} // pass json response to child
                        changeToStaticModeFromChild={this.changeTitleState}
                        saveTitleFromChild={this.saveTitleString}
                    />
                }
            </header>
        )
    }
}

export default Header