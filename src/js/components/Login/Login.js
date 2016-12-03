/**
 * Created by chandransh on 28/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import './Login.css';
import * as EventsList from '../../reducers/eventsList.js';
import Helpers from '../../utils/helpers';

class Login extends Component {
  componentWillMount() {
    Helpers.loadScript("https://apis.google.com/js/client.js");
  }

  render() {
    const {EventsList} = this.props;

    var CLIENT_ID = '873819743128-k24cs08sd7p6obn6cc44151taun99rs5.apps.googleusercontent.com';

    var SCOPES = ["https://www.googleapis.com/auth/calendar"];

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        // Load client library.
        loadCalendarApi();
      }
    }

    /**
     * Initiate auth flow in response to user clicking authorize button.
     */
    function handleAuthClick() {
      gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
      return false;
    }

    /**
     * Load Google Calendar client library. List upcoming events
     * once client library is loaded.
     */
    function loadCalendarApi() {
      gapi.client.load('calendar', 'v3', listUpcomingEvents);
    }

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    function listUpcomingEvents() {
      var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
      });

      request.execute(function(resp) {
        var events = resp.items;

        if (events.length > 0) {
          EventsList.updateState(events);
          browserHistory.push('/google-calendar-invite-app/events');
        } else {
          appendPre('No upcoming events found.');
        }
      });
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
      var pre = document.getElementById('output');
      var textContent = document.createTextNode('\n' + message + '\n');
      pre.appendChild(textContent);
    }

    return (
      <div className="center-block">
        <h1>Login to start inviting people now</h1>
        <div>
          <button className="btn google-btn" onClick={handleAuthClick}>
            Continue with Google
          </button>
        </div>
        <pre id="output"></pre>
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
)(Login);