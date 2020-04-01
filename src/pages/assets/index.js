import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { router } from 'umi';
import Header from '../../components/common/Header';
import Menus from '../../components/common/Menus';
import Activation from '../../components/wallet/Activation';
import Mining from '../../components/wallet/Mining';
import { Icons, Images } from '../../assets';
import { formatMessage } from 'umi/locale';
import { downFixed } from '../../utils/utils';

@connect(({ assetsHome, globalModel }) => ({ assetsHome, globalModel }))
class Assets extends Component {
  render() {
    return <div className={styles.assetsHome}>323</div>;
  }
}

export default Assets;
