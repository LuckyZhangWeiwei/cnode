import React, { Component } from 'react';
import { Icon } from 'antd';
import axios from 'axios';
import DetailList from './../../components/DetailList/DetailList';
import { getCookie } from './../../assets/js/utils';
import "./usermessage.scss";

export default class UserMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            has_read_messages: [],
            hasnot_read_messages: [],
            all_list:[]
        }
    }
    componentWillMount() {
        const [avatar_url, id, loginname, usertoken] = getCookie('cnodeuser').split('|');
        let url = `messages?accesstoken=${usertoken}`;
        axios.get(url).then(res => {
            if (res.success) {
                this.setState({
                    has_read_messages: res.data.has_read_messages,
                    hasnot_read_messages: res.data.hasnot_read_messages,
                    all_list: [...res.data.has_read_messages, ...res.data.hasnot_read_messages]
                })
            }
        }).catch(err => {
            alert(err);
        })
    }
    goBack() {
        window.history.back();
    }
    render() {
        console.log(this.state);
        return (
            <div className="message-container">
                <div className="banner" onClick={this.goBack}>
                    <span>
                        <Icon type="left" />
                    </span>
                    <span className="title">消息列表</span>
                </div>
                <div className="datalist-container">
                    <DetailList data={this.state.all_list} />
                </div>
            </div>
        )
    }
}