/**
 * Created by chandransh on 28/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ReactBigCalendar from 'react-big-calendar';

import './LoginButton.css';
import * as EventsList from '../../reducers/eventsList';

import Helpers from '../../utils/helpers';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: []
    };
  }

  componentWillMount() {
    Helpers.loadScript("https://apis.google.com/js/client.js");
  }

  render() {
    const {EventsList} = this.props;

    return (
     <div>
       <div id="authorize-div">
         <button className="btn google_btn" onClick={EventsList.handleAuthClick}>
           Continue with Google
         </button>
       </div>
       <pre id="output"></pre>
     </div>
   );
 }
}

LoginButton.propTypes = {
};

const mapStateToProps = (state) => ({
  eventsList: state.eventsList
});

const mapActionToProps = (dispatch) => ({
  EventsList: bindActionCreators(EventsList, dispatch)
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(LoginButton);