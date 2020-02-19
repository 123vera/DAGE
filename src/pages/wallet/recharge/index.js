import React, { Component } from 'react';
import { Icons } from '../../../assets';
import Header from '../../../components/common/Header';
import styles from './index.less';

class Recharge extends Component {
  render() {
    return (
      <div>
        <Header
          icon={Icons.arrowLeft}
          centerContent={{
            text: 'USDT',
            icon: Icons.arrowDown,
            reverse: true,
          }}
        />
        <div className={styles.content}>


        </div>
        <aside>

        </aside>
      </div>
    );
  }
}

export default Recharge;
