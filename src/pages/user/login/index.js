import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import router from 'umi/router';
import { Picker, List } from 'antd-mobile';
import styles from './index.less';
import NEXT_STEP from '@/assets/dark/next-step.png';

@connect(({ login }) => ({ login }))
class Home extends Component {
  onPickerChange = val => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/UpdateState',
      payload: { prefix: val },
    });
  };

  render() {
    const {
      login: { prefix },
    } = this.props;
    return (
      <div id={styles.userLogin}>
        <section>
          <p>{formatMessage({ id: `LOGIN_TITLE` })}</p>
          <div className={styles.mainWrapper}>
            <label htmlFor="phone">
              <span>{formatMessage({ id: `COMMON_LABEL_PHONE` })}</span>
              <div className={styles.pickerWrapper}>
                <Picker
                  data={[
                    { label: '+86', value: '+86' },
                    { label: '+33', value: '+33' },
                  ]}
                  cols={1}
                  extra={prefix || '+86'}
                  value={prefix}
                  onOk={v => this.onPickerChange(v)}
                >
                  <List.Item arrow="down" />
                </Picker>
                <input
                  id="phone"
                  type="text"
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PHONE` })}
                />
              </div>
            </label>

            <label htmlFor="password">
              <span>{formatMessage({ id: `COMMON_LABEL_PASSWORD` })}</span>
              <input
                id="password"
                type="text"
                placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_PASSWORD` })}
              />
            </label>

            <div className={styles.tipsInput}>
              <span onClick={() => router.push(`/user/register`)}>
                {formatMessage({ id: `REGISTER_TITLE` })}
              </span>
              <span>{formatMessage({ id: `LOGIN_FORGET_PASSWORD` })}</span>
            </div>

            <img className={styles.nextStep} src={NEXT_STEP} alt="" />
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
