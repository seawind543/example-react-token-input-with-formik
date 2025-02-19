/* eslint react/prop-types: 0 */

import React from 'react';
import classNames from 'classnames';

// import styles from '../myToken.scss'

type ClickHandler = (e: React.MouseEvent<HTMLDivElement>) => void;

const DeleteButton = ({ onClick }: { onClick: ClickHandler }) => {
  // Google font material-icons
  // https://fonts.google.com/icons
  return (
    <span
      className={classNames('material-icons' /* , styles['button-icon'] */)}
      role="button"
      aria-hidden="true"
      onClick={onClick}
    >
      delete
    </span>
  );
};

export default DeleteButton;
