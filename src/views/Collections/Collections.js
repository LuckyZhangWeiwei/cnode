import React, { Component } from 'react';
import { Icon } from 'antd';
import axios from 'axios';
import DetailList from './../../components/DetailList/DetailList';
import './collections.scss';

export default class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection:[]
        }
        this.goBack = this.goBack.bind(this);
    }
    componentWillMount() {
        let url = `topic_collect/${this.props.match.params.loginname}`;
        axios.get(url).then(res => {
            if (res.success) {
                this.setState({
                    collection: res.data
                })
            }
        }).catch(err => {
            alert(err);
        });
    }
    goBack() {
        window.history.back();
    }
    render() {
        return (
            <div className="collection-container">
                <div className="banner" onClick={this.goBack}>
                    <span>
                        <Icon type="left" />
                    </span>
                    <span className="title">收藏主题</span>
                </div>
                <div className="datalist-container">
                    <DetailList data={this.state.collection} />
                </div>
            </div>
            )
    }
}