import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import { Icons, Images } from '../../../assets';
import { connect } from 'dva';
import styles from './index.less';
import { router } from 'umi';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';

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

  onFileChange = event => {
    const payImg = event.target.files[0];
    this.fileToSrc(payImg);
    this.props.dispatch({
      type: 'alipay/UpdateState',
      payload: { payImg },
    });
  };

  fileToSrc = file => {
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
      return Toast.info(formatMessage({ id: `PAY_PLACEHOLDER` }));
    }
    if (!realName) {
      return Toast.info(formatMessage({ id: `PAY_PLACEHOLDER_NAME` }));
    }
    if (!payImg) {
      return Toast.info(formatMessage({ id: `PAY_UPLOAD_COLLECTION_CODE` }));
    }
    this.props
      .dispatch({
        type: 'alipay/AlipayUpload',
      })
      .then(res => {
        if (res.status !== 1) {
          return Toast.info(res.msg);
        }
        router.push('/alipay/pending');
      });
  };

  render() {
    const { payName, realName, imgSrc } = this.props.alipay;

    return (
      <div>
        <Header icon={Icons.arrowLeft} title={formatMessage({ id: `USER_SECTION_01` })} />
        <article className={styles.article}>
          <section>
            <p>{formatMessage({ id: `PAY_DESC` })}</p>
            <input
              className={styles.account}
              value={payName}
              type="text"
              placeholder={formatMessage({ id: `PAY_PLACEHOLDER` })}
              onChange={e => this.onInputChange(e.target.value, 'payName')}
            />
            <input
              className={styles.name}
              value={realName}
              type="text"
              placeholder={formatMessage({ id: `PAY_PLACEHOLDER_REALNAME` })}
              onChange={e => this.onInputChange(e.target.value, 'realName')}
            />
            <div className={styles.fileBox}>
              <input type="file" onChange={this.onFileChange} />
              <img src={imgSrc || Images.noPhoto} alt="" />
              {!imgSrc && <button>+</button>}
            </div>
            <button className={styles.submit} onClick={this.submit}>
              {formatMessage({ id: `PAY_SUBMIT` })}
            </button>
          </section>
        </article>
      </div>
    );
  }
}

export default Alipay;
