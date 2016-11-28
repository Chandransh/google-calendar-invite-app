import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './CalendarApp.scss';
// import * as ItemList from '../../reducers/itemList';

import LoginButton from '../../components/LoginButton/LoginButton';

class CalendarApp extends Component {
  render() {
    return (
      <div className="container">
        <div className="center-block">
          <h1>Login to start inviting people now</h1>
          <LoginButton/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // itemList: state.itemList
});

const mapActionToProps = (dispatch) => ({
  // ItemList: bindActionCreators(ItemList, dispatch)
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(CalendarApp);
