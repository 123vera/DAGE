import React from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';

function Pending() {
  return (
    <div className={styles.pass}>
      <Header icon={Icons.arrowLeft} onHandle={() => router.push('/home/user')} />
      <article>
        <img src={Images.alipayPending} alt="" />
        <p>
          {formatMessage({ id: `PAY_WAITING_01` })}
          <br />
          <small>{formatMessage({ id: `PAY_WAITING_02` })}</small>
        </p>
      </article>
    </div>
  );
}

export default Pending;
