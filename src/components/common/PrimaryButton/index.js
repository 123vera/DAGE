import styles from './index.less';
import React from 'react';
import { formatMessage } from 'umi-plugin-locale';

function PrimaryButton({
  value = formatMessage({ id: `COMMON_CONFIRM` }),
  full = false,
  onHandle = () => null,
}) {
  return (
    <div className={`${styles.primaryButton}  ${full ? styles.full : ''}`}>
      <button className={styles.btn} onClick={onHandle}>
        {value}
      </button>
    </div>
  );
}

export default PrimaryButton;
