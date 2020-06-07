import React from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi/locale';

function BankPay(props) {
  const onCopy = text => {
    Toast.info(formatMessage({ id: `USER_COPIED` }));
  };

  const { state: data } = props.location;
  const bankInfo = data.payimg || {}

  return <div className={styles.bankPay}>
    <Header
      icon={Icons.arrowLeft}
      title={'银行卡支付'}
    />
    <div className={styles.orderNum}>
      订单号： {data.orderno}
    </div>
    <div className={`${styles.box} ${styles.bankInfo}`}>
      <h3>请在15分钟内按照以下订单完成转账</h3>
      <div className={styles.row}>
        <label>收款账户</label>
        <div className={styles.line}>
          {bankInfo.bankNo}
          <CopyToClipboard  text={bankInfo.bankNo} onCopy={onCopy}>
            <div className={styles.copy}><span><i>复制</i></span></div>
          </CopyToClipboard>
        </div>
      </div>
      <div className={styles.row}>
        <label>收款银行</label>
        <div className={styles.line}>
          {bankInfo.bankName}
          <CopyToClipboard  text={bankInfo.bankName} onCopy={onCopy}>
            <div className={styles.copy}><span><i>复制</i></span></div>
          </CopyToClipboard>
        </div>
      </div>
      <div className={styles.row}>
        <label>账户姓名</label>
        <div className={styles.line}>
          {bankInfo.bankUserName}
          <CopyToClipboard  text={bankInfo.bankUserName} onCopy={onCopy}>
            <div className={styles.copy}><span><i>复制</i></span></div>
          </CopyToClipboard>
        </div>
      </div>
      <div className={styles.row}>
        <label>附言信息</label>
        <div className={styles.line}>
          {data.remark}
          <CopyToClipboard  text={data.remark} onCopy={onCopy}>
            <div className={styles.copy}><span><i>复制</i></span></div>
          </CopyToClipboard>
        </div>
      </div>
      <div className={styles.row}>
        <label>充值金额</label>
        <div className={styles.line}>
          {data.num}
          <CopyToClipboard  text={data.num} onCopy={onCopy}>
            <div className={styles.copy}><span><i>复制</i></span></div>
          </CopyToClipboard>
        </div>
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
    <aside className={styles.box}>
      <ul>
        <li>
          <span>1</span>登录网银，按照订单进行转账；
        </li>
        <li>
          <span>2</span>核对金额，金额匹配自动转账。
        </li>
      </ul>
    </aside>
  </div>;
}

export default BankPay;
