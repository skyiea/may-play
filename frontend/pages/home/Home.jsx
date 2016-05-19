import React, { Component } from 'react';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';

import Chat from 'components/chat/ChatContainer';

import styles from './Home.scss';

@ReactClass
@CSSModules(styles)
class Home extends Component {
    render() {
        return (
            <section styleName="home-page">
                <h2>Home</h2>
                
                <section styleName="chat-container">
                    <Chat/>
                </section>
            </section>
        );
    }
}

export default Home;