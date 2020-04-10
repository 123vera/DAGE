import { Component } from 'react';
import styles from './index.less';
import React from 'react';
import { Icons, Images } from '../../../assets';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import { formatMessage } from 'umi-plugin-locale';
import GroupTitle from '../GroupTitle';
import { Link } from 'react-router-dom';

@connect(({ wallet, globalModel }) => ({ wallet, globalModel }))
class Activation extends Component {
  onSubmit = () => {
    const { dispatch, globalModel } = this.props;
    const { myInfo } = globalModel;
    if (myInfo.did < 10) {
      return Toast.info(formatMessage({ id: `EXCHANGE_BALANCE_NOT_ENOUGH_01` }));
    }
    dispatch({ type: 'wallet/ActivateRole' }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      Toast.info(formatMessage({ id: `EXCHANGE_SUCCESS_01` }), 2, () => {
        dispatch({ type: 'globalModel/GetMyInfo' });
      });
    });
  };

  render() {
    const { myInfo } = this.props.globalModel;
    const isActivate = myInfo.activate === 1;

    return (
      <div className={styles.activation}>
        <GroupTitle
          icon={Icons.dIcon}
          title={formatMessage({ id: `WALLET_ACTIVITY_ID` })}
          msg={
            myInfo.activate === 1
              ? formatMessage({ id: `USER_ACTIVITY` })
              : formatMessage({ id: `USER_UNACTIVITY` })
          }
        />
        {!isActivate ? (
          <div className={styles.content}>
            <p>
              <Link to="/wallet/recharge?type=USDT">
                {formatMessage({ id: `HOME_SECTION_CONTENT_01` })}
              </Link>
              {formatMessage({ id: `HOME_SECTION_CONTENT_02` })}
              <Link to="/exchange">{formatMessage({ id: `HOME_SECTION_CONTENT_03` })}</Link>
              {formatMessage({ id: `HOME_SECTION_CONTENT_04` })}
            </p>
            <div className={styles.toActivation}>
              <span>{formatMessage({ id: `HOME_SECTION_CONTENT_05` })}10DID</span>
              <button onClick={this.onSubmit}>{formatMessage({ id: `WALLET_CONFIRM` })}</button>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <p>
              <Link to="/wallet/withdraw?type=DID">
                {formatMessage({ id: `HOME_SECTION_CONTENT_001` })}
              </Link>
              {formatMessage({ id: `HOME_SECTION_CONTENT_002` })}
            </p>
            <div className={styles.hasActivation}>
              <Link to="/wallet/reward-detail">
                {formatMessage({ id: `HOME_SECTION_CONTENT_003` })}
              </Link>
              <Link to="/referral_code">{formatMessage({ id: `HOME_SECTION_CONTENT_004` })}</Link>
            </div>
          </div>
        )}
        <div className={styles.banner} style={{ backgroundImage: `url(${Images.cardBg})` }}>
          <label>{formatMessage({ id: `ECOLOGICAL_CURRENCY_TITLE_01` })}</label>
          <small
            dangerouslySetInnerHTML={{ __html: formatMessage({ id: `HOME_SECTION_CARD_DESC` }) }}
          />

          <Link to="/exchange">{formatMessage({ id: `HOME_SECTION_CARD_GO` })}</Link>
        </div>
      </div>
    );
  }
}

export default Activation;
