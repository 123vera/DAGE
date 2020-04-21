import React from 'react';
import styles from './index.less';
import { Icons } from '../../../assets';
import Menus from '../../common/Menus';

function CoinSwitch(props = {}) {
  const { showMenus, coin, menus, click, change } = props;
  return (
    <div className={styles.coinSwitch}>
      <div className={styles.switch} onClick={click}>
        <span>{coin}</span>
        <img src={Icons.arrowDown} alt="" />
      </div>
      {showMenus && (
        <div className={styles.menus}>
          <Menus menus={menus} textAlign="left" hasBorder maxWidth="100%" onHandle={change} />
        </div>
      )}
    </div>
  );
}

export default CoinSwitch;
