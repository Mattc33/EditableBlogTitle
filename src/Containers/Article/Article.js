import React from 'react'
import classes from './Article.module.css'

import Header from '../../Components/Header/Header'
import Main from '../../Components/Main/Main'

const Article = () => 
    <div className={classes.pageContainer}>
        <Header />
        <Main />
    </div>

export default Article

