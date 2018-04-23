import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Badge } from 'antd';
import axios from 'axios';
import { getCookie } from './../../assets/js/utils';
import './sideLeft.scss';

export default class SideRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unReadCount:0
        }
    }
    componentDidMount() {
        const [avatar_url, id, loginname, usertoken] = getCookie('cnodeuser').split('|');
        let url = `/message/count/?accesstoken=${usertoken}`;
        axios.get(url, {}).then(data => {
            this.setState({
                unReadCount:data.data
            })
        })
    }
    render() {
        const { avatar_url, id, loginname } = this.props.userInfo;
        return (
            <div className="side-left">
                <div className="top">
                    <div className="user-info">
                        {
                            avatar_url ?
                                <NavLink to={`/user/${loginname}`}>
                                    <img src={decodeURIComponent(avatar_url)} alt={loginname} className="avatar" />
                                </NavLink>
                                :
                                <NavLink to='/login'>
                                    <div className="avatar no-avatar"></div>
                                </NavLink>
                        }
                        <p>{loginname ? loginname:"请先登录"}</p>
                    </div>
                </div>
                <ul className="nav">
                    <li><NavLink to={`/user/${loginname}`}><Icon type="meh-o" />个人中心</NavLink></li>
                    <li><NavLink to={`/message`}><Icon type="bell" /><Badge count={this.state.unReadCount} style={{ left: 70}}><span>消息提醒</span></Badge></NavLink> </li>
                    <li><NavLink to={`/user/collection/${loginname}`}><Icon type="heart-o" />我的收藏</NavLink></li>
                </ul>
            </div>
            );
    }
}