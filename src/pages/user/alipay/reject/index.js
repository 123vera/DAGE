import React from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';

function Reject() {
  return (
    <div className={styles.pass}>
      <Header icon={Icons.arrowLeft} onHandle={() => router.push('/home/user')} />
      <article>
        <img src={Images.alipayReject} alt="" />
        <p>
          {formatMessage({ id: `PAY_FAIL_01` })}
          <br />
          <small>{formatMessage({ id: `PAY_FAIL_02` })}支付宝账户与二维码不符</small>
        </p>
        <div className={styles.submit}>
          <button onClick={() => router.push('/alipay?upload=1')}>
            {formatMessage({ id: `PAY_REUPLOAD` })}
          </button>
        </div>
      </article>
    </div>
  );
}

export default Reject;
