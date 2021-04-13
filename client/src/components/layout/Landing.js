import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

Landing.propTypes = {

};

function Landing(props) {
  return (
    <Redirect to='login' />
  );
}

export default Landing;