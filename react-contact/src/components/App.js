import React from 'react'
import { hot } from 'react-hot-loader'
import Contact from './Contact';

class App extends React.Component {
    render(){
        return (
            <Contact/>
        );
    }
}

export default hot(module) (App);