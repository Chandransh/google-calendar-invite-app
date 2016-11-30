/**
 * Created by chandransh on 29/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import './Calendar.css';

import ReactBigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import * as EventsList from '../../reducers/eventsList';

class Calendar extends Component {
  constructor (props) {
    super(props);
    ReactBigCalendar.momentLocalizer(moment);
  }

  componentDidMount() {
    this.props.eventsList.loaded === false && browserHistory.push('/');
  }

  render() {
    const {eventsList} = this.props;

    let eventsData = [];
    for(let i = 0; i < eventsList.data.length; i++) {
      let isAllDayEvent = moment(eventsList.data[i].end.date).diff(eventsList.data[i].start.date, 'days') === 1;

      eventsData.push({
        'end' : isAllDayEvent ? moment(eventsList.data[i].end.date).subtract(1, 'seconds') : eventsList.data[i].end.date,
        'start' : eventsList.data[i].start.date,
        'title' : eventsList.data[i].summary,
        'allDay' : isAllDayEvent
      });
    }

    return (
      <div className="center-block">
        <h1>Your Calendar</h1>
        <div className="calendar-container">
          <ReactBigCalendar
            events={eventsData}
            timeslots={8}
            views={['month', 'week', 'day']}
          />
        </div>
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
