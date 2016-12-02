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
import Modal from '../Modal/Modal';
import Helpers from '../../utils/helpers';

class Calendar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEventInviteVisible : false,
      selectedDateData : {}
    };
    ReactBigCalendar.momentLocalizer(moment);
  }

  componentWillMount() {
    Helpers.loadScript("https://apis.google.com/js/client.js");
  }

  componentDidMount() {
    this.props.eventsList.loaded === false && browserHistory.push('/');
  }

  handleFormSubmit = (e) => {
    var attendeesEmails = document.getElementById('event-attendees').value.match(/[^,; ]+/g);
    var attendees = [];
    var reForEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    attendeesEmails.map(function(email) {
      reForEmail.test(email) && attendees.push({'email': email});
    });

    var event = {
      'summary': document.getElementById('event-name').value,
      'start': {
        'dateTime': document.getElementById('event-start-date').value
      },
      'end': {
        'dateTime': document.getElementById('event-end-date').value
      },
      'attendees': attendees
    };

    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
      'sendNotifications': true
    });

    request.execute(function(event) {
      //alert('Event created successfully!');
    });
    e.preventDefault();
  };

  handleDateClick = (slotInfo) => {
    this.setState({
      isEventInviteVisible : true,
      selectedDateData : {
        start : slotInfo.start,
        end : slotInfo.end
      }
    });
  };

  hideModal = () => {
    this.setState({isEventInviteVisible : false});
  };

  render() {
    const {eventsList} = this.props;

    let eventsData = [];
    for(let i = 0; i < eventsList.data.length; i++) {
      let isAllDayEvent = moment(eventsList.data[i].end.date).diff(eventsList.data[i].start.date, 'days') === 1;

      eventsData.push({
        'end' : isAllDayEvent ? moment(eventsList.data[i].end.date).subtract(1, 'seconds') : eventsList.data[i].end.date, //1 second is subtracted to exclude next day; overrides default include behaviour of ReactBigCalendar
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
            selectable={true}
            onSelectSlot={(slotInfo) => this.handleDateClick(slotInfo)}
          />
        </div>
        <i>Note: Drag on calendar to select multiple dates.</i>

        <Modal show={this.state.isEventInviteVisible} onClose={this.hideModal}>
          <div className="invite-container center-block">
            <h2>Create Event</h2>
            <form id="invite-form"
                  className="center-block"
                  onSubmit={this.handleFormSubmit}>
              <label htmlFor="event-name">Event name</label>
              <input type="text" name="event-name" id="event-name" required/>
              <br/>
              <label htmlFor="event-start-date">Event start date</label>
              <input type="text"
                     name="event-start-date"
                     id="event-start-date"
                     disabled
                     value={this.state.selectedDateData.start}
              />
              <br/>
              <label htmlFor="event-end-date">Event end date</label>
              <input type="text"
                     name="event-end-date"
                     id="event-end-date"
                     disabled
                     value={this.state.selectedDateData.end}
              />
              <br/>
              <label htmlFor="event-attendees">Attendees' emails</label>
              <textarea id="event-attendees" required></textarea>
              <i>Note: Use comma separated emails for inviting multiple people.</i>
              <br/>
              <input type="submit"
                     name="submit"
                     value="Send Invite"
                     className="btn btn-primary"/>
            </form>
          </div>
        </Modal>
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
