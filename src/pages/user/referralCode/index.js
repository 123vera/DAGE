import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import PageHeader from '@/components/common/PageHeader';
import REFERRAL_CODE from '@/assets/imgs/referral-code.png';
// import DOWNLOAD from '@/assets/icons/download.png';
import styles from './index.less';
import { formatMessage } from 'umi/locale';
import { Icons } from '../../../assets';

@connect(({ globalModel }) => ({ globalModel }))
class Index extends Component {
  onCopyLink = text => {
    text && Toast.info(formatMessage({ id: `USER_COPIED` }));
  };

  render() {
    const {
      globalModel: {
        myInfo: { recommendCode },
      },
    } = this.props;

    return (
      <div className={styles.referralCode} style={{ backgroundImage: `url(${REFERRAL_CODE})` }}>
        <PageHeader
          title={formatMessage({ id: `SET_ACCOUNT_RECOMMEND` })}
          leftContent={{ icon: Icons.arrowLeft }}
        />
        <div className={styles.mainContent}>
          <div className={styles.qrCode}>
            <QrCodeBox key="https://wallet.thedage.com" value="https://wallet.thedage.com" />
          </div>
          <span>{recommendCode || '--'}</span>
          <CopyToClipboard
            key={new Date().toString()}
            text={recommendCode}
            onCopy={this.onCopyLink}
          >
            <span className={styles.copyText}>{formatMessage({ id: `REFERRAL_CODE_COPY` })}</span>
          </CopyToClipboard>
          <aside className={styles.download}>{formatMessage({ id: `REFERRAL_SAVE` })}</aside>
        </div>
      </div>
    );
  }
}

export default Index;

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
