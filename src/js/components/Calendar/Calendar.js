/**
 * Created by chandransh on 29/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './Calendar.css';
import * as EventsList from '../../reducers/eventsList';

class Calendar extends Component {
  render() {
    const {eventsList} = this.props;

    return (
      <div className="container">
        <h1>Hello!</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  eventsList: state.eventsList
});

const mapActionToProps = (dispatch) => ({
  EventsList: bindActionCreators(EventsList, dispatch)
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(Calendar);
