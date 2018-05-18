import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input,Button} from 'antd';
import './postbox.scss'
import Overlay from './../../Overlay/Overlay';

const { TextArea } = Input;
export default class PostBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atAuthor: null,
            isFirstTime:true
        }
    }
    componentWillReceiveProps(nextprops) {
       if (nextprops.IsShow) {
        let content= ReactDOM.findDOMNode(this.refs.replyContent);
        console.log(content);
        if(content){
            let author= nextprops.atAuthor===null?null:"@"+ nextprops.atAuthor+" ";
            ReactDOM.findDOMNode(content).value=author;
        }
        this.setState({
            isFirstTime:false
           })
       }
    }
    componentWillUnmount(){
        let content= ReactDOM.findDOMNode(this.refs.replyContent);
        if(content)ReactDOM.findDOMNode(content).value=null;
    }
    handleChange(key, val) {
        this.setState({
            [key]: val.target.value
        })
    }
    renderContent(isShow) {
        let contentClass = this.state.isFirstTime?"content-box":
        isShow ? "content-box  content-up" : "content-box  content-down";

        if (this.props.Type === "Topic") {
            return <div className={contentClass} onClick={(e)=>{e.stopPropagation();}}>
                <Input placeholder="请输入标题" onChange={v => this.handleChange('title', v)} />
                <TextArea rows={9} placeholder="请输入内容" onChange={v => this.handleChange('content', v)}/>
                <div>
                    <Button type="primary" onClick={() => this.props.onNewPost(this.state)}>提交</Button>
                    <Button type="primary" onClick={this.props.onCloseModel}>取消</Button>
                </div>
            </div>;
        } else {
            return <div className={contentClass} onClick={(e)=>{e.stopPropagation();}}>
                <TextArea rows={9} placeholder="请输入内容" ref="replyContent" onChange={v => this.handleChange('content', v)}/>
                <div>
                    <Button type="primary" onClick={() => this.props.onNewPost(this.state)}>提交</Button>
                    <Button type="primary" onClick={this.props.onCloseModel}>取消</Button>
                </div>
            </div>;
        }
    }
    render() {
        //  let dialogClass = this.props.IsShow ? "dialog  as-in":"as-out" ;
        // let dialog =
        //     <div className="container">
        //         <div className={dialogClass} onClick={this.props.onCloseModel}></div>
        //         {this.renderContent(this.props.IsShow)}
        // </div>
        // return dialog;

        const dialog= <Overlay onClose={this.props.onCloseModel} isshow={this.props.IsShow}>
             {this.renderContent(this.props.IsShow)}
        </Overlay>;
       
        return dialog;
    }
}