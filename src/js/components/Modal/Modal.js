'use strict';
import React, {Component} from 'react';
import styles from './Modal.css';

class Modal extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      show: props.show
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    if(this.props.show) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = '';
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.getElementsByTagName('body')[0].style.overflow = '';
  }

  handleKeyDown = (e) => { //To hide the modal using Esc key
    if (e.which == 27) {
      this.props.onClose(e);
    }
  };

  render() {
    if(!this.props.show) return null;
    return (
      <div className="modal-container">
        <span className="cross-icon" aria-hidden="true"
              onClick={this.props.onClose}>x</span>
        <div className="overlay-bg" data-overlay="true"
             onClick={this.props.onClose}></div>
        <div className="modal-custom">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired
};

export default Modal;
