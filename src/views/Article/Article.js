import React, { Component } from 'react';
import './article.scss';
import axios from 'axios';
import { Row, Col, Icon ,Spin} from 'antd';
import { getDurTime, getCookie } from './../../assets/js/utils';
import ReplyList from './../../components/ReplyList/ReplyList';
import PostBox from './../../components/common/PostBox/PostBox';

const [avatar_url, id, loginname, usertoken, isLogin] = getCookie('cnodeuser').split('|');
let G_TopicId = null;
let G_Author_Id = null;
export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            loginname: null,
            create_at: null,
            visit_count: null,
            title: null,
            content: null,
            reply_count: null,
            last_reply_at: null,
            replies: [],
            is_collect: false,
            topicId: null,
            isShowDialog: false,
            atAuthor: null,
            showLoading: true,
            isNeedToRenderReply:true
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        let topicUrl = isLogin === true ? `/topic/${id}` : `/topic/${id}/?accesstoken=${usertoken}`;
        axios.get(topicUrl).then(data => {
            const { author: { avatar_url, loginname }, create_at, visit_count, title, content, reply_count, last_reply_at, replies, is_collect, author_id } = data.data;
            G_Author_Id = author_id;
            this.setState({
                ...this.state,
                avatar_url,
                loginname,
                create_at,
                visit_count,
                title,
                content,
                reply_count,
                last_reply_at,
                replies: [...replies],
                is_collect,
                topicId: id,
                showLoading:false
            })
        })
    }
    handleGoBack() {
        //window.history.back();
        this.props.history.goBack();
    }
    collectTopic(IsCollected) {
        let url = IsCollected ? `topic_collect/collect` : `topic_collect/de_collect`;
        const { id } = this.props.match.params;
        axios.post(url, {
            accesstoken: usertoken,
            topic_id: id
        }).then(res => {
            if (res.success) {
                this.setState({
                    ...this.state,
                    is_collect: !this.state.is_collect
                })
                }
        }).catch(err => {
            alert(err);
        })
    }
    showReplyDialog(replyItem) {
        G_TopicId = replyItem===null?null: replyItem.id;
        this.setState({
             ...this.state,
            isShowDialog: true,
            atAuthor: G_TopicId == null ? null : replyItem.author.loginname,
            isNeedToRenderReply:false
        })
    }
    closeModel() {
        this.setState({
            isShowDialog: false,
            isNeedToRenderReply:false
        })
    }
    newReply(Reply) {
        const { id } = this.props.match.params;
        axios.post(`topic/${id}/replies`, {
            accesstoken: usertoken,
            content : Reply.content,
            reply_id: G_TopicId
        }).then(res => {
            let topicUrl = isLogin === true ? `/topic/${id}` : `/topic/${id}/?accesstoken=${usertoken}`;
            axios.get(topicUrl).then(data => {
                    let newReply = data.data.replies.filter(item => { return item.id === res.reply_id })[0];
                    this.setState({
                        replies: [...this.state.replies,newReply],
                        isShowDialog: false,
                        isNeedToRenderReply:true
                    })
                })
        }).catch(err => {
            alert(err);
        })
    }
    likeReply(replyItem) {
           let url = `reply/${replyItem.id}/ups`;
            axios.post(url, {
                accesstoken: usertoken
            }).then(res => {
                for (let index in this.state.replies) {
                    if (this.state.replies[index].id === replyItem.id) {
                        if (res.success) {
                            if (res.action === "up") {
                                this.state.replies[index].is_uped = true;
                                this.state.replies[index].ups.push(G_Author_Id);
                                this.setState({
                                    replies: this.state.replies
                                })
                            } else {
                                this.state.replies[index].is_uped = false;
                                //let filertedUps = this.state.replies[index].ups.filter(item => { return item !== G_Author_Id });
                                //this.state.replies[index].ups = [...filertedUps];
                                this.state.replies[index].ups.pop();
                                this.setState({
                                    replies: this.state.replies,
                                    isNeedToRenderReply:true
                                })
                            }
                        }
                    }
                }
            }).catch(err => {
                alert(err);
            })
    }
    renderArticle(){
        const { avatar_url, loginname, create_at, visit_count, title, content, reply_count, last_reply_at, replies, is_collect, showLoading,isNeedToRenderReply } = this.state;
        const height = window.innerHeight - 40;
        const collect_Icon = is_collect === true ?
            <Icon type="star" onClick={this.collectTopic.bind(this, false)}></Icon>
            :
            <Icon type="star-o" onClick={this.collectTopic.bind(this, true)}></Icon>;
           
        if(showLoading){
            return  <Spin style={{ marginTop: "80%", marginLeft: "50%" }} type="loading" spin="true"/>;
        }else{
            console.log("replies:",isNeedToRenderReply);
           return   <div className="article" >
           <div className="article-b">
               <Icon type="arrow-left" className="btn-left" onClick={this.handleGoBack.bind(this)} />
               <h4 className="title">帖子详情</h4>
               <div className="arrow-right">
                   <Icon type="form" onClick={this.showReplyDialog.bind(this, null)}></Icon>
                   {collect_Icon}
               </div>
           </div>
           <div className="article-content" style={{ maxHeight: height }}>
           <div className="top">
               <Row>
                   <Col span={4}>
                       <img src={avatar_url} />
                   </Col>
                   <Col span={20}>
                       <p className="user-name">{loginname}</p>
                       <p className="info">at {getDurTime(create_at)},{visit_count} 次点击</p>
                   </Col>
               </Row>
           </div>
           <div className="content">
               <div className="title">
                   {title}
               </div>
               <div dangerouslySetInnerHTML={{ __html: `${content}` }} className="article-text"></div>
               <p className="reply-count">{reply_count} 回复 | 直到 {last_reply_at}</p>
           </div>
           <div className="reply">
               <ReplyList 
                   data={replies}
                   onShowReplyDialog={this.showReplyDialog.bind(this)}
                   onLikeReply={this.likeReply.bind(this)}
                   NeedRender={this.state.isNeedToRenderReply}
               />
           </div>
           <PostBox
               onCloseModel={this.closeModel.bind(this)}
               onNewPost={this.newReply.bind(this)}
               IsShow={this.state.isShowDialog}
               atAuthor={this.state.atAuthor}
               Type="Reply" />
           </div>
</div>;
        }
  }
    render() {
      
        return (<div>{this.renderArticle()}</div>);
    }

}