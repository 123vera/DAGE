import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { formatMessage } from 'umi/locale';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import PageHeader from '../../../components/common/PageHeader';
import styles from './index.less';

class QrCodeBox extends Component {
  state = {
    url: '',
  };

  componentDidMount() {
    const canvas = document.querySelector(`.${styles.qrCodeBox} canvas`);
    const url = (canvas && canvas.toDataURL('image/png')) || '';
    this.setState({ url });
  }

  render() {
    const { value } = this.props;
    const { url } = this.state;

    return (
      <div className={styles.qrCodeBox}>
        <QRCode className={styles.qrCode} size={250} value={value || ''} />
        <br />
        <img src={url} alt="" />
      </div>
    );
  }
}

class Index extends Component {
  state = {};

  componentDidMount() {
    const { state = {} } = this.props.location;
    this.setState({ ...state }, () => this.countDown());
  }

  countDown = () => {
    const { endTime } = this.state;
    if (endTime <= 0) return;

    setTimeout(() => {
      this.setState({ endTime: endTime - 1 }, () => this.countDown());
    }, 1000);
  };

  addZero = num => {
    return num < 10 ? '0' + num : num;
  };

  getDisplayTime = time => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    return `${this.addZero(minute)}分${this.addZero(second)}秒`;
  };

  render() {
    const { payImg, endTime, orderNo, num } = this.state;

    return (
      <div id={styles.dgtPay}>
        <PageHeader
          title={formatMessage({ id: `DGT_ALIPAY_TITLE` })}
          leftContent={{ icon: ARROW_LEFT }}
        />
        <p className={styles.title}>{`${formatMessage({
          id: `DGT_ALIPAY_ORDERID`,
        })}  ${orderNo}`}</p>

        <section className={styles.top}>
          <p>￥{num}</p>
          <QrCodeBox key={payImg} value={payImg} />
          <small>
            {formatMessage({ id: `DGT_ALIPAY_DEALLINE` })}
            <span>{this.getDisplayTime(endTime)}</span>
          </small>
          <ul>
            <li dangerouslySetInnerHTML={{ __html: formatMessage({ id: `DGT_ALIPAY_TIPS_01` }) }} />
            <li>{formatMessage({ id: `DGT_ALIPAY_TIPS_02` })}</li>
            <li>{formatMessage({ id: `DGT_ALIPAY_TIPS_03` })}</li>
          </ul>
        </section>
        <section className={styles.bottom}>
          <ul>
            <li>{formatMessage({ id: `DGT_ALIPAY_STEPS_01` })}</li>
            <li>{formatMessage({ id: `DGT_ALIPAY_STEPS_02` })}</li>
            <li>{formatMessage({ id: `DGT_ALIPAY_STEPS_03` })}</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Index;
