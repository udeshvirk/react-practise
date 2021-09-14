import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';

const sideDrawer = props => {
    const classes = [styles.SideDrawer];
    if (props.showSideDrawer) {
        classes.push(styles.Open);
    } else {
        classes.push(styles.Close);
    }
    return (
        <Aux>
            <Backdrop show={props.showSideDrawer} clicked={props.closed} />
            <div className={classes.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;