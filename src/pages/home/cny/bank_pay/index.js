import React from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';

function BankPay() {
  return <div className={styles.bankPay}>
    <Header
      icon={Icons.arrowLeft}
      title={'银行卡支付'}
    />
    <div className={styles.orderNum}>
      订单号： M2334343434hhh7823
    </div>
    <div className={styles.box}>
      <h3>请在15分钟内按照以下订单完成转账</h3>
      <div className={styles.row}>
        <label>收款账户</label>
        <p>
          6662 2379 8367 8372 8823
          <button>复制</button>
        </p>
      </div>
      <div className={styles.row}>
        <label>收款银行</label>
        <p>
          中国农业银行
          <button>复制</button>
        </p>
      </div>
      <div className={styles.row}>
        <label>账户姓名</label>
        <p>
          张山
          <button>复制</button>
        </p>
      </div>
      <div className={styles.row}>
        <label>附言信息</label>
        <p>
          给XXX转账
          <button>复制</button>
        </p>
      </div>
      <div className={styles.row}>
        <label>充值金额</label>
        <p>
          2999
          <button>复制</button>
        </p>
      </div>
      <ul>
        <li>
          为了快速到账，请按照上述金额汇款
        </li>
        <li>
          0点以后充值，如未正确填写充值信息导致无法自动到账，将于次日早上8点后处理
        </li>
      </ul>
    </div>
    <div className={styles.box}>

    </div>
  </div>;
}

export default BankPay;
