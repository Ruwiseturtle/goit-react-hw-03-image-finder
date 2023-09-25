import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

//для модалки створили окремий портал у файлі public/index.html
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component{
   
  componentDidMount() {
      console.log('escape');
        window.addEventListener('keydown', this.handleKeyDown)
  }
  
  //метод для очистки за собой
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
     if (e.code === 'Escape') {
          this.props.onClose();
       }            
    }
  
    render() { 
        // this.props.children
        console.log("check");
        console.log(this.props.src);
        
           return createPortal(
             <div className={css.overlay} onClick={this.props.onClose}>
               <div className={css.modal}>
                 <img
                   className={css.image}
                   src={this.props.src}
                   alt="picture"
                 />
               </div>
             </div>,
             modalRoot
           );       
    }
}