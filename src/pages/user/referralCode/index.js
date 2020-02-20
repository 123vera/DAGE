import React, { Component } from 'react';
import QRcode from 'qrcode.react';
import { Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import PageHeader from '@/components/common/PageHeader';
import REFERRAL_CODE from '@/assets/imgs/referral-code.png';
import DOWNLOAD from '@/assets/icons/download.png';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import styles from './index.less';

class Index extends Component {
  onCopyLink = (text, result) => {
    Toast.info('已复制');
  };

  downloadSvg = () => {
    const qr = document.querySelector('canvas');
    let image = new Image();
    image.src = qr && qr.toDataURL('image/png');
    let a_link = document.getElementById('aId');
    a_link.href = image.src;
  };

  render() {
    return (
      <div id={styles.referralCode} style={{ backgroundImage: `url(${REFERRAL_CODE})` }}>
        <PageHeader title="推荐码" leftContent={{ icon: ARROW_LEFT }} />
        <div className={styles.mainContent}>
          <QRcode id="qrid" width="250px" height="250px" value={'33'} renderAs="canvas" />
          <span>No GKDHEK</span>
          <CopyToClipboard key={new Date().toString()} text="No GKDHEK" onCopy={this.onCopyLink}>
            <span className={styles.copyText}>复制邀请码</span>
          </CopyToClipboard>
          <a download href=" " id="aId" className={styles.download} onClick={this.downloadSvg}>
            <img src={DOWNLOAD} alt="download" />
          </a>
        </div>
      </div>
    );
  }
}

export default Index;
