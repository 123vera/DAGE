import React, { Component } from 'react';
import Header from '../../../../components/common/Header';
import { Icons, Images } from '../../../../assets';
import styles from './index.less';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';

@connect(({ alipay }) => ({ alipay }))
class Reject extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'alipay/AlipayInit' });
  }

  render() {
    const { initInfo } = this.props.alipay;
    return (
      <div className={styles.pass}>
        <Header icon={Icons.arrowLeft} onHandle={() => router.push('/main/user')} />
        <article>
          <img src={Images.alipayReject} alt="" />
          <p>
            {formatMessage({ id: `PAY_FAIL_01` })}
            <br />
            <small>
              {formatMessage({ id: `PAY_FAIL_02` })}
              {initInfo.msg}
            </small>
          </p>
          <div className={styles.submit}>
            <button onClick={() => router.push('/user/alipay?upload=1')}>
              {formatMessage({ id: `PAY_REUPLOAD` })}
            </button>
          </div>
        </article>
      </div>
    );
  }
}

export default Reject;
