import React, { Component } from 'react';
import ARROW_LEFT from '@/assets/icons/arrow-left.png';
import { LANG } from '../../../utils/constants';
import CHECKED from '@/assets/icons/checked.png';
import UNCHECKED from '@/assets/icons/un-checked.png';
import PageHeader from '@/components/common/PageHeader';
import { removeCookie } from '../../../utils/utils';
import styles from './index.less';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-locale';

class Index extends Component {
  state = {
    activeKey: LANG.findIndex(val => val === getLocale() || 0),
    lang: getLocale(),
  };

  toSetLang = (lang, key) => {
    this.setState({ activeKey: key, lang });
  };

  confirmLang = () => {
    setLocale(this.state.lang);
    removeCookie('lang');
  };

  render() {
    const { activeKey } = this.state;
    return (
      <div id={styles.switchLang}>
        <PageHeader
          title={formatMessage({ id: `USER_SECTION_05` })}
          leftContent={{ icon: ARROW_LEFT }}
        />
        <ul className={styles.list}>
          {LANG.map((item, key) => (
            <li key={key} onClick={() => this.toSetLang(item, key)}>
              <span>{formatMessage({ id: `LANG_${item.toUpperCase().replace('-', '_')}` })}</span>
              <img src={activeKey === key ? CHECKED : UNCHECKED} alt="" />
            </li>
          ))}
        </ul>

        <p onClick={this.confirmLang} className={`${styles.btn} ${styles.confirm}`}>
          确认
        </p>
      </div>
    );
  }
}

export default Index;
