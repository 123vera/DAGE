import { Icons } from '../../../assets';
import React from 'react';
import styles from './index.less';

export default function PartLoading() {
  return (
    <div  className={styles.partLoading}>
      <img src={Icons.loading} alt=""/>
    </div>
  );
}
