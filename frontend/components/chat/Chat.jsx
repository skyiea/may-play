import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';
import wsChat from 'ws/wsChat';

import Input from 'components/input/Input';

import styles from './Chat.scss';

@ReactClass
@CSSModules(styles)
class Chat extends Component {
    static PropTypes = {
        log: PropTypes.array.isRequired,

        fetchData: PropTypes.func.isRequired,
        enterChat: PropTypes.func.isRequired,
        leaveChat: PropTypes.func.isRequired
    };
    
    state = {
        enteredMessage: ''
    };

    _handleInputKeyDown = (e) => {
        const { enteredMessage } = this.state;

        if (e.key === 'Enter' && enteredMessage.length) {
            this.setState({
                enteredMessage: ''
            });

            this.props.sendMessage(enteredMessage);
        }
    };

    _handleInputChange = (e) => {
        this.setState({
            enteredMessage: e.target.value
        });
    };

    convertDateToTime(timestamp) {
        const date = new Date(timestamp);

        // TODO: smarter version
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    componentWillMount() {
        this.props.fetchData();
        this.props.enterChat();

        wsChat.listenMessages();
    }

    componentWillUnmount() {
        this.props.leaveChat();
        
        wsChat.unlistenMessages();
    }

    render() {
        const {
            log
        } = this.props;

        const {
            enteredMessage
        } = this.state;

        return (
            <section styleName="chat">
                <section styleName="messages">
                    {
                        log.map((messageData, index) => {
                            const { type, payload } = messageData;

                            return (
                                <div key={index} styleName="message">
                                    {
                                        type === 'user-message' ?
                                            <span styleName="user">
                                                <span styleName="time">
                                                    {`[${this.convertDateToTime(payload.date)}] `}
                                                </span>

                                                <span styleName="name">{payload.user}</span>
                                                <span styleName="message">{payload.message}</span>
                                            </span> :
                                            <span styleName="server">{payload}</span>
                                    }
                                </div>
                            );
                        })
                    }
                </section>
                
                <Input
                        styleName="text-input"
                        type="text"
                        placeholder="Message"
                        value={enteredMessage}
                        onKeyDown={this._handleInputKeyDown}
                        onChange={this._handleInputChange}
                />
            </section>
        );
    }
}

export default Chat;