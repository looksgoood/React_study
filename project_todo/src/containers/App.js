import React from 'react';
import { hot } from 'react-hot-loader';
import { Header } from 'components';

class App extends React.Component {
    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
        return (
            <div>
                {isAuth ? undefined : <Header />}
            </div>
        );
    }
}

export default hot(module) (App);