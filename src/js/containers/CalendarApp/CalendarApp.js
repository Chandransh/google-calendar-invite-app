import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './CalendarApp.css';

class CalendarApp extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
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
