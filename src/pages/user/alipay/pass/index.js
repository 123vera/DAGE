import React from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';

function Pass() {
  return (
    <div className={styles.pass}>
      <Header icon={Icons.arrowLeft} onHandle={() => router.push('/home/user')} />
      <article>
        <img src={Images.alipayPass} alt="" />
        <p dangerouslySetInnerHTML={{ __html: formatMessage({ id: `PAY_SUCCESS` }) }} />
      </article>
    </div>
  );
}

export default Pass;
