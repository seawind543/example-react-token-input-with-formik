import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable-next-line import/no-extraneous-dependencies */
import classNames from 'classnames';

import styles from './Section.styl';

const Section = (props) => (
  <div className={classNames(props.className, styles.section)}>
    <div className={styles['section-content']}>{props.children}</div>
  </div>
);

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
