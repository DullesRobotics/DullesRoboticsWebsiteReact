import styles from './layout.module.css'
import React from 'react';
import Header from './header'
import Footer from './footer'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.listen((location, action) => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    return (
      <>
        <main className={styles.screenSize}>
          <div>
            <Header dir={this.props.location.pathname}></Header>
          </div>
          <div id="page-wrap">
            <main>{this.props.children}</main>
          </div>
        </main>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

Layout.propTypes = {
  callbackLocation: PropTypes.func,
}

export default withRouter(Layout);