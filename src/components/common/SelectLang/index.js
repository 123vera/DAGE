import React, { Component } from 'react';
import router from 'umi/router';
import ICON_SWITCH from '@/assets/icons/switch-lang.png';
import { formatMessage, getLocale } from 'umi-plugin-locale';
import styles from './index.less';

export default class SelectLang extends Component {
  render() {
    const type =
      getLocale() &&
      getLocale()
        .toUpperCase()
        .replace('-', '_');
    return (
      <div className={styles.switchLang} onClick={() => router.push('/switch_lang')}>
        <img src={ICON_SWITCH} alt="" />
        <span>
          {formatMessage({
            id: `LANG_${type}`,
          })}
        </span>
      </div>
    );
  }
}
