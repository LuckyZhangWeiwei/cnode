import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import { getDurTime } from './../../assets/js/utils';
import './detailList.scss';

export default class DetailList extends Component {
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
    renderList() {
        let dataList = this.state.data; 
        let array = [];
        dataList.map((d, i) => {
            let ele = <Row key={`${i}`} className="row-wrap">
                <NavLink to={`/article/${d.id}`} className="list">
                    <Col span={4} className="list-left">
                        <img src={d.author.avatar_url} alt={d.author.loginname} />
                    </Col>
                    <Col span={20} className="list-right">
                        <p className="list-user">{d.author.loginname}</p>
                        <p className="list-til">{d.title}</p>
                        <p className="list-time">{getDurTime(d.last_reply_at)}</p>
                    </Col>
                </NavLink>
            </Row>;
            array.push(ele);
        });
        return array;
    }
    render() {
        const height=window.innerHeight-40;
        return (
            <div className="list-container" style={{maxHeight:height}}>
                {this.renderList()}
            </div>
            )
    }
}

