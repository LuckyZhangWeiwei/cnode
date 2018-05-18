import React, { Component } from 'react';
import { Button, Input, message } from 'antd';
import { setCookie, getCookie } from '../../assets/js/utils';
import axios from 'axios';
import './login.scss';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.handleLogin=this.handleLogin.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.loginIn=this.loginIn.bind(this);
    }
    handleChange(e) {
        this.setState({
            user:e.target.value
        })
    }
    handleLogin() {
        const { user } = this.state;
        axios.post('accesstoken', {
            accesstoken:user
        })
        .then(res => {
            const { avatar_url, id, loginname } = res;
            const userInfo = avatar_url + '|' + id + '|' + loginname + '|' + user;
            setCookie('cnodeuser', userInfo);
            message.success('登录成功', 2, () => {
                this.loginIn();
            })
        }).catch(error => {
            message.error('登录失败');
        })
    }
    loginIn() {
        this.props.history.push("/topic/all");
    }
    componentDidMount() {
        const [avatar_url, id, loginname, usertoken, isLogin] = getCookie('cnodeuser').split('|');
        if (avatar_url) {
            this.props.history.push("/topic/all");
        }
    }
    render() {
        const { user } = this.state;
        return (
            <div className="login">
                <div className="logo">
                    <div className="logo-img">JS</div>
                    <h1 className="logo-name">Cnode</h1>
                </div>
                <div className="login-content">
                    <Input onChange={this.handleChange} placeholder="请输入 Access Token" />
                    <p>
                        <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    </p>
                    <p>
                        <Button type="danger" onClick={this.loginIn}>跳过</Button>
                    </p>
                </div>
                <p className="foot">cnode 第三方客户端</p>
            </div>
            );
    }
}