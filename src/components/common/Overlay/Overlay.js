import React ,{ Component }from 'react';
import ReactDOM from 'react-dom';
import './overlay.scss'

class Overlay extends Component{
   constructor(props){
       super(props);
       this.container = document.createElement('div');
       document.body.appendChild(this.container);
       this.handleClick=this.handleClick.bind(this);
   }
   componentWillUnmount(){
      document.body.removeChild(this.container);
   }
   handleClick(){
     this.props.onClose();
   }
   render(){
    let dialogClass = this.props.isshow ? "overlay as-in":"as-out" ;
       return ReactDOM.createPortal(
           <div className={dialogClass} onClick={this.handleClick}>
              {this.props.children}
           </div>
       ,this.container);
   }
}
export default Overlay;