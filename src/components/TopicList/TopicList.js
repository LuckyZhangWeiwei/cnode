﻿import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './topiclist.scss';
import { Row, Col, Spin } from 'antd';
import axios from 'axios';
import { getDurTime } from './../../assets/js/utils';

export default class TopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isAddLoad: false,
            params: {
                limit: 20,
                page: 1,
                tab: this.props.tab
            }
        }
        this.onScrollHandle=this.onScrollHandle.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (
            this.state.params.tab !== nextProps.tab
            ||
            nextProps.refresh===true
        ) {
            this.setState({
                data: [],
                isAddLoad: true,
                params: {
                    limit: 20,
                    page: 1,
                    tab: nextProps.tab
                }
            }, () => {
                this.getData();
            })
        }
    }
    componentDidMount() {
        this.getData();
        this.contentNode && this.contentNode.addEventListener('scroll', this.onScrollHandle);
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
        this.contentNode && this.contentNode.removeEventListener('scroll', this.onScrollHandle);
    }
    onScrollHandle(event) {
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        const isBottom = (clientHeight + scrollTop === scrollHeight);
        if (isBottom) {
            this.setState({
                isAddLoad: true,
                params: {
                    limit: 20,
                    page: ++this.state.params.page,
                    tab: this.props.tab
                }
            }, () => {
                setTimeout(() => {
                    this.getData();
                },2000)
            })
        }
    }
    getData() {
        const { params } = this.state;
        axios.get('/topics', {
            params: params
        }).then(data => {
            this.setState({
                data: [...this.state.data,...data.data],
                isAddLoad: false
            });
        })
    }
    getType(tab) {
        let type;
        switch (tab) {
            case 'share':
                type = '分享';
                break;
            case 'ask':
                type = '问答';
                break;
            case 'job':
                type = '招聘';
                break;
            case 'good':
                type = '精华';
                break;
            case 'dev':
                type = '测试';
                break;
            default:
                break;
        }
        return type;
    }
    renderList() {
        const { data } = this.state;
        const listDOM = [];
        data.map((d,i) => {
            let type; let emphase = false;
            if (d.top) {
                emphase = true;
                type = '置顶';
            } else if (d.good) {
                emphase = true;
                type = '精华';
            } else {
                emphase = false;
                type =this.getType(d.tab);
            }
            listDOM.push(
                <Row className="list" key={`${i}`}>
                    <Col span={20} className="list-left">
                        <NavLink to={`/user/${d.author.loginname}`} className="list-avatars" title={d.author.loginname}>
                            <img src={d.author.avatar_url} alt={d.author.loginname} />
                        </NavLink>
                        <span className={emphase ? 'list-type emphase' : 'list-type'}>{type}</span>
                        <NavLink to={`/article/${d.id}`} className="list-til">
                            <p title={d.title}>{d.title}</p>
                            <span>{d.reply_count}/{d.visit_count}</span>
                        </NavLink>
                    </Col>
                    <Col span={4} className="list-time">
                        {getDurTime(d.last_reply_at)}
                    </Col>
                </Row>
            );
        })
        return listDOM;
    }
    render() {
        const height = window.innerHeight - 40;
        const { isAddLoad } = this.state;
        return (
            <section className="topic-wrap">
                <div className="topic-list" ref={node => this.contentNode = node} style={{ maxHeight: height }}>
                    {this.renderList()}
                    <div className={isAddLoad ? "add-load active" :"add-load"}>
                        <Spin className="load-icon" />
                    </div>
                </div>
            </section>
            );
    }
}

