import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import { Icons, Images } from '../../../assets';
import { connect } from 'dva';
import styles from './index.less';
import { router } from 'umi';
import { Toast } from 'antd-mobile';

@connect(({ alipay }) => ({ alipay }))
class Alipay extends Component {
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { upload } = location.query;
    if (upload === '1') return;
    dispatch({ type: 'alipay/AlipayInit' }).then(res => {
      if (res.status === 1) {
        const { status } = res.data;
        if (status === 0) router.push('/alipay/pending');
        if (status === 1) router.push('/alipay/pass');
        if (status === 2) router.push('/alipay/reject');
      }
    });
  }

  onInputChange = (value, key) => {
    this.props.dispatch({
      type: 'alipay/UpdateState',
      payload: { [key]: value },
    });
  };

  onFileChange = (event) => {
    const payImg = event.target.files[0];
    this.fileToSrc(payImg);
    this.props.dispatch({
      type: 'alipay/UpdateState',
      payload: { payImg },
    });
  };

  fileToSrc = (file) => {
    const { dispatch } = this.props;
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
      dispatch({
        type: 'alipay/UpdateState',
        payload: { imgSrc: evt.target.result },
      });
    };
    reader.readAsDataURL(file);
  };

  submit = () => {
    const { payName, realName, payImg } = this.props.alipay;
    if (!payName) {
      return Toast.info('请输入支付宝账号');
    }
    if (!realName) {
      return Toast.info('请输入姓名');
    }
    if (!payImg) {
      return Toast.info('请上传收款码');
    }
    this.props.dispatch({
      type: 'alipay/AlipayUpload',
    });
  };

  render() {
    const { payName, realName, imgSrc } = this.props.alipay;

    return (
      <div>
        <Header
          icon={Icons.arrowLeft}
          title={'上传支付宝信息'}
        />
        <article className={styles.article}>
          <section>
            <p>
              请上传您的支付宝收款二维码，且需要您在安卓设备上下载自由侠App并登录与上传的二维码一致的支付宝账号，保持自由侠始终在打开状态，如果您没有打开自由侠，发现后客服将在后台扣除当日的挖矿奖励
            </p>
            <input
              className={styles.account}
              value={payName}
              type="text"
              placeholder={'请输入支付宝账号'}
              onChange={(e) => this.onInputChange(e.target.value, 'payName')}
            />
            <input
              className={styles.name}
              value={realName}
              type="text"
              placeholder={'请输入支付宝实名认证姓名'}
              onChange={(e) => this.onInputChange(e.target.value, 'realName')}
            />
            <div className={styles.fileBox}>
              <input
                type="file"
                onChange={this.onFileChange}
              />
              <img src={imgSrc || Images.noPhoto} alt=""/>
              {!imgSrc && <button>+</button>}
            </div>
            <button
              className={styles.submit}
              onClick={this.submit}
            >
              提交审核
            </button>
          </section>
        </article>
      </div>
    );
  }
}

export default Alipay;
