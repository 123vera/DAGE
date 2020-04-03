import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
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
  render() {
    return (
      <div id={styles.dgtPay}>
        <PageHeader title={'支付宝支付'} leftContent={{ icon: ARROW_LEFT }} />
        <p className={styles.title}>订单号： 32413432</p>

        <section className={styles.top}>
          <p>￥887</p>
          <QrCodeBox value="323232" />
          <small dangerouslySetInnerHTML={{ __html: '距离订单过期还有' }} />
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
