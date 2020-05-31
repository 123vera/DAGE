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
        // 0为待审核，1为审核通过，-1被驳回，-2未上传
        if (status === 0) router.push('/user/alipay/pending'); // 待审核
        if (status === 1) router.push('/user/alipay/pass'); // 审核通过
        if (status === -1) router.push('/user/alipay/reject'); // 被驳回
      }
    });
  }

  onInputChange = (value, key) => {
    this.props.dispatch({
      type: 'alipay/UpdateState',
      payload: { [key]: value },
    });
  };

  onFileChange = async event => {
    const payImg = event.target.files[0];

    await this.props.dispatch({
      type: 'alipay/UpdateState',
      payload: { imgSrc: null, payImg: null },
    });

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
          res.msg && Toast.info(res.msg);
          return;
        }
        router.push('/user/alipay/pending');
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
              autoComplete="off"
              placeholder={formatMessage({ id: `PAY_PLACEHOLDER` })}
              onChange={e => this.onInputChange(e.target.value, 'payName')}
            />
            <input
              className={styles.name}
              value={realName}
              type="text"
              autoComplete="off"
              placeholder={formatMessage({ id: `PAY_PLACEHOLDER_REALNAME` })}
              onChange={e => this.onInputChange(e.target.value, 'realName')}
            />
            <div className={styles.fileBox}>
              <input type="file" onChange={this.onFileChange} />
              <img className={styles.imgWrapper} src={imgSrc || Images.noPhoto} alt="" />
              {!imgSrc && <span>+</span>}
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
