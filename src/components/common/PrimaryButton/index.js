import styles from './index.less';
import React from 'react';

function PrimaryButton(
  {
    value = '确人',
    full = false,
    onHandle = () => null,
  },
) {
  return <div className={`${styles.primaryButton}  ${full ? styles.full : ''}`}>
    <button className={styles.btn} onClick={onHandle}>
      {value}
    </button>
  </div>;
}

export default PrimaryButton;
