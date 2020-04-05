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
        <QRCode className={styles.qrCode} size={250} value={value || ''}/>
        <br/>
        <img src={url} alt=""/>
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

  addZero = (num) => {
    return num < 10 ? '0' + num : num;
  };

  getDisplayTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    return `${this.addZero(minute)}分${this.addZero(second)}秒`;
  };

  render() {
    const { payImg, endTime, orderNo, num } = this.state;

    return (
      <div id={styles.dgtPay}>
        <PageHeader title={'支付宝支付'} leftContent={{ icon: ARROW_LEFT }}/>
        <p className={styles.title}>订单号：{orderNo}</p>

        <section className={styles.top}>
          <p>￥{num}</p>
          <QrCodeBox key={payImg} value={payImg}/>
          <small>
            距离订单过期还有
            <span>{this.getDisplayTime(endTime)}</span>
          </small>
          <ul>
            <li>每次充值必须在钱包充值页面重新获取二维码</li>
            <li>实际支付金额与订单金额必须保持一致；</li>
            <li>请在订单有效期内完成支付</li>
          </ul>
        </section>
        <section className={styles.bottom}>
          <ul>
            <li>长按/截图，保存到相册；</li>
            <li>打开支付宝扫一扫，相册识别；</li>
            <li>进行支付确认。</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Index;
