import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import { getDurTime, getCookie } from './../../assets/js/utils';
import axios from 'axios';
import './replyList.scss';

const [avatar_url, id, loginname, usertoken, isLogin] = getCookie('cnodeuser').split('|');
export default class ReplyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }
    componentWillReceiveProps(nextprops){
        this.setState({
           data:nextprops.data            
        })
    }
    shouldComponentUpdate(nextprops,nextstate){
        return nextprops.NeedRender;
    }
    renderOperationArea(d) {
        let replyAuthor = d.author.loginname;
        let area = <div>
            <Icon type={d.is_uped ? "like" : "like-o"} className="like" onClick={this.props.onLikeReply.bind(this, { id: d.id })}>{[...d.ups].length === 0 ? null : [...d.ups].length}</Icon>
            <Icon type="form" style={{ marginLeft: 10 }} onClick={this.props.onShowReplyDialog.bind(this, d)} />
        </div>;
        return replyAuthor === loginname?null: area;
    }
    renderList() {
        const { data } = this.state;
        const listDOM = data.map((d, i) => (
            d.author &&
            <div key={`${i}`} className="row-wrap">
                <Row className="list-a">
                    <Col span={4} className="list-left">
                        <NavLink to={`/user/${d.author.loginname}`}>
                            <img src={d.author.avatar_url} alt={d.author.loginname} />
                        </NavLink>
                    </Col>
                    <Col span={20}>
                        <div dangerouslySetInnerHTML={{ __html: `${d.content}` }} className="reply-detail"></div>
                    </Col>
                </Row>
                <div className="list-down">
                    <div>
                        <p className="list-user">{d.author.loginname}</p>
                        <p className="list-time">{i + 1}楼 {getDurTime(d.create_at)}</p>
                    </div>
                    {this.renderOperationArea(d)}
                </div>
              
            </div>
        ))
        return listDOM
    }
    render() {
        return (
            <div className="reply-list">
                {this.renderList()}
            </div>
            )
    }
}