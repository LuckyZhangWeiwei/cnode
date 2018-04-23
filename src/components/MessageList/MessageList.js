import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Badge } from 'antd';
import { getDurTime } from './../../assets/js/utils';
import './messagelist.scss';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }
    renderType(type) {
        switch (type) {
            case "reply":
                return "<span class='reply'>回复</span>";
            case "at":
                return "<span class='at'>提及</span>";
        }
    }
    renderList() {
        let dataList = this.state.data;
        let array = [];
        dataList.map((d, i) => {
            let ele =
                <Row key={`${i}`} className="row-wrap" onClick={() => this.props.onSeeReply(d.topic.id,d.id)}>
                    <Col span={4} className="list-left">
                        <Badge style={{ left: 60,top:5}} dot={d.has_read ? false : true}>
                            <div className="left-content">
                                <img src={d.author.avatar_url} alt={d.author.loginname} />
                            <p className="list-user">{d.author.loginname}</p>
                            </div>
                        </Badge>
                    </Col>
                    <Col span={16} className="list-center">
                        <p className="list-till">{d.topic.title}</p>
                        <div className="list-content" dangerouslySetInnerHTML={{ __html: `${d.reply.content}` }} ></div>
                    </Col>
                    <Col span={4} className="list-right">
                        <p dangerouslySetInnerHTML={{ __html: `${this.renderType(d.type)}` }}></p>
                        <p className="list-time">{getDurTime(d.create_at)}</p>
                    </Col>
            </Row>;
            array.push(ele);
        });
        return array;
    }
    render() {
        return (
            <div className="list-container">
                {this.renderList()}
            </div>
        )
    }
}

