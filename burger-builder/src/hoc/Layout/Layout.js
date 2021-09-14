import React, { Component } from 'react';
import Aux from "../Aux/Aux";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosehandler = () => {
        this.setState({ showSideDrawer: false });
    }
    sideDrawerTogglehandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar toggleSideDrawer={this.sideDrawerTogglehandler} />
                <SideDrawer
                    showSideDrawer={this.state.showSideDrawer}
                    closed={this.sideDrawerClosehandler} />
                <main className={styles.content}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;