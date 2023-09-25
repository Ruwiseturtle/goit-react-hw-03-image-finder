import React from 'react';
import css from './IconButton.module.css';
// import PropTypes from 'prop-types';



const IconButton = () => (
  <button type="submit" className={css.button}></button>
);

// IconButton.defaultProps = {
//   onClick: () => null,
//   children: null,
// };

// IconButton.propTypes = {
//   onClick: PropTypes.func,
//   children: PropTypes.node,
//   'aria-label': PropTypes.string.isRequired,
// };

export default IconButton;