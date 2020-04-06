import styles from './index.less';
import React from 'react';

export default function SubmitBtn(props) {
  return (
    <div className={` ${styles.submit}`}>
      <button onClick={props.onClick}>{props.value}</button>
    </div>
  );
}
