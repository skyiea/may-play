import React, { Component, PropTypes } from 'react';
import { ReactClass } from 'react-core-decorators';

import CSSModules from 'utils/css-modules';

import Loader from 'components/loader/Loader';
import Input from 'components/input/Input';

import styles from './Chat.scss';

@ReactClass
@CSSModules(styles)
class Chat extends Component {
    static PropTypes = {
        log: PropTypes.array.isRequired,
        onlineUsers: PropTypes.array.isRequired,

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
        const hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${hours}:${minutes}:${seconds}`;
    }

    _isOnline() {
        const {
            status,
            userName
        } = this.props;

        return status === 'online' && !!userName;
    }

    _scrollToBottom() {
        const logEl = this.refs.log;

        logEl.scrollTop = logEl.scrollHeight;
    }

    componentWillMount() {
        const {
            userName,
            
            enterChat,
            fetchData
        } = this.props;
        
        enterChat();
        
        if (!userName) {
            fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        const logUpdated = this._isOnline() && prevProps.log.length !== this.props.log.length;

        if (logUpdated) {
            this._scrollToBottom();
        }
    }

    componentWillUnmount() {
        this.props.leaveChat();
    }

    render() {
        const {
            log,
            status,
            onlineUsers,
            userName
        } = this.props;

        const {
            inputMessage
        } = this.state;

        if (status === 'disconnected') {
            return (
                <section styleName="disconnected-message-container">
                    <div styleName="message">Lost connection with server. Reconnecting..</div>
                    <Loader isDark/>
                </section>
            );
        }
        
        if (!this._isOnline()) {
            return (
                <section styleName="loader-container">
                    <Loader isDark/>
                </section>
            );
        }

        return (
            <section styleName="chat">
                <section styleName="online-list">
                    <div>Online users:</div>
                    {
                        onlineUsers.map((name, index) => {
                            if (name !== userName) {
                                return (
                                    <li key={index}>{name}</li>
                                );
                            }
                        })
                    }
                </section>
                <section styleName="message-container">
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
                            autoFocus
                            value={inputMessage}
                            onKeyDown={this._handleInputKeyDown}
                            onChange={this._handleInputChange}
                    />
                </section>  
            </section>
        );
    }
}

export default Chat;