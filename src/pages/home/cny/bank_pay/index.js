import React from 'react';
import styles from './index.less';
import Header from '../../../../components/common/Header';
import { Icons } from '../../../../assets';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi/locale';

function BankPay(props) {
  const onCopy = () => {
    Toast.info(formatMessage({ id: `USER_COPIED` }));
  };

  const { state: data } = props.location;
  const bankInfo = data.payimg || {};

  return (
    <div className={styles.bankPay}>
      <Header icon={Icons.arrowLeft} title={formatMessage({ id: `BANK_PAY_TITLE` })} />
      <div className={styles.orderNum}>
        {formatMessage({ id: `BANK_PAY_ORDERID` })} {data.orderno}
      </div>
      <div className={`${styles.box} ${styles.bankInfo}`}>
        <h3>{formatMessage({ id: `BANK_PAY_TIPS` })}</h3>
        <div className={styles.row}>
          <label>{formatMessage({ id: `BANK_PAYMENT_ACCOUNT` })}</label>
          <div className={styles.line}>
            {bankInfo.bankNo}
            <CopyToClipboard text={bankInfo.bankNo} onCopy={onCopy}>
              <div className={styles.copy}>
                <span>
                  <i>{formatMessage({ id: `BANK_PAY_COPY` })}</i>
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.row}>
          <label>{formatMessage({ id: `BANK_PAYMENT_N` })}</label>
          <div className={styles.line}>
            {bankInfo.bankName}
            <CopyToClipboard text={bankInfo.bankName} onCopy={onCopy}>
              <div className={styles.copy}>
                <span>
                  <i>{formatMessage({ id: `BANK_PAY_COPY` })}</i>
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.row}>
          <label>{formatMessage({ id: `BANK_PAYMENT_NAME` })}</label>
          <div className={styles.line}>
            {bankInfo.bankUserName}
            <CopyToClipboard text={bankInfo.bankUserName} onCopy={onCopy}>
              <div className={styles.copy}>
                <span>
                  <i>{formatMessage({ id: `BANK_PAY_COPY` })}</i>
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.row}>
          <label>{formatMessage({ id: `BANK_PAYMENT_MSG` })}</label>
          <div className={styles.line}>
            {data.remark}
            <CopyToClipboard text={data.remark} onCopy={onCopy}>
              <div className={styles.copy}>
                <span>
                  <i>{formatMessage({ id: `BANK_PAY_COPY` })}</i>
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.row}>
          <label>{formatMessage({ id: `BANK_PAY_AMOUNT` })}</label>
          <div className={styles.line}>
            {data.num}
            <CopyToClipboard text={data.num} onCopy={onCopy}>
              <div className={styles.copy}>
                <span>
                  <i>{formatMessage({ id: `BANK_PAY_COPY` })}</i>
                </span>
              </div>
            </CopyToClipboard>
          </div>
        </div>
        <ul>
          <li>{formatMessage({ id: `BANK_PAY_TIPS_01` })}</li>
          <li>{formatMessage({ id: `BANK_PAY_TIPS_02` })}</li>
        </ul>
      </div>
      <aside className={styles.box}>
        <ul>
          <li>
            <span>1</span>
            {formatMessage({ id: `BANK_PAY_TIPS_03` })}
          </li>
          <li>
            <span>2</span>
            {formatMessage({ id: `BANK_PAY_TIPS_04` })}
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default BankPay;
