import React, { Component } from 'react';
import Banner from './../../components/Banner/Banner';
import TopicList from './../../components/TopicList/TopicList';
import SideRight from './../../components/SideRight/SideRight';
import SideLeft from './../../components/SideLeft/SideLeft';
import PostBox from './../../components/common/PostBox/PostBox';
import { getCookie} from './../../assets/js/utils';
import './topic.scss';
import axios from 'axios';


export default class Topics extends Component {
    constructor(props) {
        super(props);
        const [avatar_url, id, loginname, usertoken] = getCookie('cnodeuser').split('|');
        this.state = {
            isRight: false,
            isShowAdd: this.props.match.params.id === "dev" && usertoken ? true : false,
            isShowDialog: false,
            resfresh: false,
            userInfo: {
                avatar_url: null,
                id: null,
                loginname: null,
                usertoken: null
            }
        }
        this.handleRight=this.handleRight.bind(this);
        this.handleAdd=this.handleAdd.bind(this);
        this.handleLeft=this.handleLeft.bind(this);
        this.closeModel=this.closeModel.bind(this);
        this.newPost=this.newPost.bind(this);
    }
    componentWillMount() {
        const [avatar_url, id, loginname, usertoken] = getCookie('cnodeuser').split('|');
        this.setState({
            userInfo: {
                avatar_url, id, loginname, usertoken
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        //if (this.props.match.params.id !== nextProps.match.params.id && nextProps.match.params.id === "dev") {
        const [avatar_url, id, loginname, usertoken] = getCookie('cnodeuser').split('|');
        if (nextProps.match.params.id === "dev" && usertoken ) {
            this.setState({
                isShowAdd: true
            })
        } else {
            this.setState({
                isShowAdd: false
            })
        }
    }
    
    handleLeft() {
        this.setState({
            isLeft: !this.state.isLeft
        })
    }
    handleRight() {
        this.setState({
            isRight: !this.state.isRight
        })
    }
    handleAdd() {
        this.setState({
            isShowDialog: true,
            isRight: false
        })
    }
    closeModel() {
        this.setState({
            isShowDialog: false
        })
    }
    newPost(newPost) {
        axios.post('topics', {
            accesstoken: this.state.userInfo.usertoken, 
            title: newPost.title,
            tab: "dev",
            content: newPost.content
        }).then(res => {
            this.setState({
                isShowDialog: false,
                resfresh: true
            })
         })
        .then(() => {
            this.setState({
                resfresh: false
            })
        })
        .catch(error => {
            alert("操作失败");
        })
    }
    render() {
        const { isRight, isLeft} = this.state;
        let toLR;
        if (isRight) {
            toLR = '-23%';
        } else if (isLeft) {
            toLR = '60%';
        } else {
            toLR = 0;
        }
        return (
            <div className="topic">
                {
                    isLeft ? <SideLeft userInfo={this.state.userInfo} /> : null
                }
                <div className="content" style={{ marginLeft: toLR }}>
                    <Banner showLeft={this.handleLeft} showRight={this.handleRight} showAddBtn={this.state.isShowAdd} addBtnOnClick={this.handleAdd}>
                    </Banner>
                    <TopicList tab={this.props.match.params.id} refresh={this.state.resfresh} />
                </div>
                {
                    isRight ? <SideRight/>:null
                }
                 <PostBox
                        onCloseModel={this.closeModel}
                        onNewPost={this.newPost}
                        IsShow={this.state.isShowDialog}
                        Type="Topic"
                    /> 
            </div>
            );
    }
}