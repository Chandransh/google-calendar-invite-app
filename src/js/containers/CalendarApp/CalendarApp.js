import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './CalendarApp.scss';
import * as ItemList from '../../reducers/itemList';

import LoginBox from '../../components/LoginBox/LoginBox';

class CalendarApp extends Component {
  render () {
    const {itemList, ItemList} = this.props;
    return (
      <div className="container">
        <h1>Login to start inviting people now</h1>
        <LoginBox/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemList: state.itemList
});

const mapActionToProps = (dispatch) => ({
  ItemList: bindActionCreators(ItemList, dispatch)
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(CalendarApp);
