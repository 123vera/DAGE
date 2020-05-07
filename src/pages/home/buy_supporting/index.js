import styles from './index.less';
import Header from '../../../components/common/Header';
import React, { useEffect, useState, useCallback } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { HomeApi } from '../../../services/api';
import Toast from 'antd-mobile/es/toast';
import Menus from '../../../components/common/Menus';
import { downFixed } from '../../../utils/utils';


function BuySupporting() {
  const [showMenus, setShowMenus] = useState(false);
  const [gear, setGear] = useState({});
  const [gears, setGears] = useState([]);
  const [coin, setCoin] = useState();
  const [coins, setCoins] = useState([]);
  const [coinInfo, setCoinInfo] = useState({});

  useEffect(() => {
    getSupportingInfo();
  }, [coin]);

  const getSupportingInfo = (coin) => {
    HomeApi.getSupportings({ type: coin }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      const { buyotc, type } = res.data;
      setCoinInfo(type);
      setCoins(buyotc.CURRENCY);
      const gears = Object.keys(buyotc).slice(1).map(level => {
        return { ...buyotc[level], LEVEL: level };
      });
      setGears(gears);
      setGear(gears[0]);
    });
  };

  const buySupporting = () => {
    HomeApi.buySupporting({
      type: coin || coins[0],
      buylv: gear.LEVEL,
    }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      Toast.info('购买成功', 2, () => router.push('/home/order-detail'));
    });
  };

  const currCoin = coin || coins[0];
  console.log(gear);
  console.log(coinInfo);
  return <div
    className={styles.buySupporting}
    onClick={() => setShowMenus(false)}
  >
    <Header
      icon={Icons.arrowLeft}
      title={'购买配套'}
      rightContent={{
        text: '订单详情',
        textStyle: { color: '#F3AF66' },
        onHandle: () => router.push('/home/order-detail'),
      }}
    />
    <section>
      <div className={styles.label}>
        购买档位（USDT）
      </div>
      <ul className={styles.gears}>
        {gears.map(i =>
          <li key={i.NUM} className={i.LEVEL === gear.LEVEL ? styles.active : ''}>
            <span onClick={() => setGear(i)}>
              {i.NUM}
            </span>
          </li>)
        }
      </ul>
      <div className={styles.income}>
        <p>
          <span>总收益</span>
          <span>{gear.EST} EST + {gear.RC} RC + {gear.USDT} USDT</span>
        </p>
        <p>
          <small>EST 及 RC 为立即发放，USDT 为每日释放，释放比例：{gear.RATIO}%</small>
        </p>
      </div>
    </section>
    <section>
      <div className={styles.label}>
        支付方式
      </div>
      <div className={styles.payment}>
        <div
          className={styles.coin}
        >
          <div
            className={styles.select}
            onClick={(e) => {
              setShowMenus(!showMenus);
              e.stopPropagation();
            }}
          >
            <span>{currCoin}</span>
            <img src={Icons.arrowDown} alt=""/>
          </div>
          {showMenus && <div className={styles.options}>
            <Menus
              menus={coins.map(i => ({ label: i, value: i }))}
              active={currCoin}
              onHandle={(menu) => {
                console.log(menu.value);
                setCoin(menu.value);
                setShowMenus(false);
              }}
              isFull={true}
              maxWidth='auto'
            />
          </div>}
        </div>
        <aside>可用 {coinInfo.currency}：{downFixed(coinInfo.balance)}</aside>

      </div>
      <div className={styles.row}>
        <span>当前汇率</span>
        <span>{coinInfo.ratio} {coinInfo.currency}/USDT</span>
      </div>
      <div className={styles.row}>
        <span>预计消耗</span>
        <span>{coinInfo.ratio ? gear.NUM / coinInfo.ratio : '--'} {coinInfo.currency}</span>
      </div>
    </section>
    <section className={styles.btnBox}>
      <button onClick={() => buySupporting()}>
        确认购买
      </button>
    </section>
  </div>;
}

export default BuySupporting;
;
