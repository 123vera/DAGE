import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import PageHeader from '@/components/common/PageHeader';
import { Picker, List } from 'antd-mobile';
import styles from './index.less';
import NEXT_STEP from '@/assets/dark/next-step.png';

@connect(({ forgotPassword }) => ({ forgotPassword }))
class Home extends Component {
  state = {
    prefix: '',
  };

  onPickerChange = val => {
    this.setState({ prefix: val });
  };

  render() {
    const { prefix } = this.state;
    return (
      <div id={styles.forgotPassword}>
        <PageHeader />
        <section>
          <p>{formatMessage({ id: `LOGIN_FIND_PASSWORD` })}</p>
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

            <label htmlFor="code">
              <span>{formatMessage({ id: `COMMON_LABEL_VERFICATION_CODE` })}</span>
              <div className={`${styles.codeWrapper} `}>
                <input
                  id="code"
                  type="text"
                  autoComplete="off"
                  placeholder={formatMessage({ id: `COMMON_PLACEHOLDER_CODE` })}
                  onBlur={e => this.regInput('code', e)}
                  onChange={e => this.setState({ code: e.target.value })}
                />
                <span className={styles.codeNumber}>
                  {formatMessage({ id: `REGISTER_GET_CODE` })}
                </span>
              </div>
            </label>

            <img className={styles.nextStep} src={NEXT_STEP} alt="" />
          </div>
        </section>
      </div>
    );
  }
}
export default Home;
