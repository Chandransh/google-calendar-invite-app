/**
 * Created by chandransh on 28/11/16.
 */
import React, {PropTypes} from 'react'
import './LoginBox.css';

const LoginBox = () => (
    <button className="btn google_btn">
      <strong><i className="fa fa-google">&nbsp;</i></strong>
      Continue with Google
    </button>
);

LoginBox.propTypes = {
};

export default LoginBox;