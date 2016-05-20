import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';
import wsChat from 'ws/wsChat';

import Loader from 'components/loader/Loader';
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
        inputMessage: ''
    };

    _handleInputKeyDown = (e) => {
        const {
            inputMessage
        } = this.state;

        if (e.key === 'Enter' && inputMessage.length) {
            this.setState({
                inputMessage: ''
            });

            this.props.sendMessage(inputMessage);
        }
    };

    _handleInputChange = (e) => {
        this.setState({
            inputMessage: e.target.value
        });
    };

    _convertDateToTime(timestamp) {
        const date = new Date(timestamp);

        // TODO: smarter version
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    _isOnline() {
        const {
            online,
            userName
        } = this.props;

        return online && !!userName;
    }

    _scrollToBottom() {
        const logEl = this.refs.log;

        logEl.scrollTop = logEl.scrollHeight;
    }

    componentWillMount() {
        this.props.fetchData();
        this.props.enterChat();

        wsChat.listenMessages();
    }

    componentDidUpdate(prevProps) {
        const logUpdated = this._isOnline() && prevProps.log.length !== this.props.log.length;

        if (logUpdated) {
            this._scrollToBottom();
        }
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
            inputMessage
        } = this.state;
        
        if (!this._isOnline()) {
            return (
                <section styleName="loader-container">
                    <Loader isDark/>
                </section>
            );
        }

        return (
            <section styleName="chat">
                <section
                        ref="log"
                        styleName="log">
                    {
                        log.map((messageData, index) => {
                            const { type, payload } = messageData;

                            return (
                                <div key={index} styleName="message">
                                    {
                                        type === 'user-message' ?
                                            <span styleName="user">
                                                <span styleName="time">
                                                    {`[${this._convertDateToTime(payload.date)}] `}
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
                        wrapperClassName={styles['text-input']}
                        type="text"
                        placeholder="Message"
                        value={inputMessage}
                        onKeyDown={this._handleInputKeyDown}
                        onChange={this._handleInputChange}
                />
            </section>
        );
    }
}

export default Chat;