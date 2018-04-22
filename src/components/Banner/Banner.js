import React, { Component } from 'react';
import { Icon, Badge } from 'antd';
import './banner.scss';

class Banner extends Component {
    renderRightContent() {
        let rightContent = this.props.showAddBtn ?
            <div>
                <Icon type="plus" className="btn-right left" onClick={this.props.addBtnOnClick} />
                <Icon type="ellipsis" className="btn-right" onClick={this.props.showRight} />
            </div>
            :
            <div>
                <Icon type="ellipsis" className="btn-right" onClick={this.props.showRight} />
            </div>;
        return rightContent;
    }
    render() {
        return (
            <div className="banner">
                <Icon type="menu-fold" className="btn-left" onClick={this.props.showLeft} />
                <h4 className="title">cnode</h4>
                {this.renderRightContent()}
            </div>
            );
    }
}
export default Banner;