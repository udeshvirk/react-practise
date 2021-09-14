import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true;
        }
        return false;
    }
    render() {
        const classes = [styles.Modal];
        if (this.props.show) {
            classes.push(styles.Show)
        }
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.join(' ')}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}
export default Modal;