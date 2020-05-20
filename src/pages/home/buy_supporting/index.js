import styles from './index.less';
import Header from '../../../components/common/Header';
import React, { useEffect, useState } from 'react';
import { Icons } from '../../../assets';
import { router } from 'umi';
import { HomeApi } from '../../../services/api';
import Toast from 'antd-mobile/es/toast';
import Menus from '../../../components/common/Menus';
import { downFixed } from '../../../utils/utils';
import { formatMessage, getLocale } from 'umi-plugin-locale';

function BuySupporting() {
  const [showMenus, setShowMenus] = useState(false);
  const [gear, setGear] = useState({});
  const [gears, setGears] = useState([]);
  const [coin, setCoin] = useState();
  const [coins, setCoins] = useState([]);
  const [coinInfo, setCoinInfo] = useState({});

  useEffect(() => {
    getSupportingInfo(coin);
  }, [coin]);

  const getSupportingInfo = coin => {
    HomeApi.getSupportings({ type: coin }).then(res => {
      if (res.status !== 1) {
        return Toast.info(res.msg);
      }
      const { buyotc, type } = res.data;

      setCoinInfo(type);
      setCoins(buyotc.CURRENCY);
      const gears = Object.keys(buyotc)
        .slice(2)
        .map(level => {
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
      Toast.info(formatMessage({ id: `BUY_SUCCESS` }), 2, () => router.push('/home/order-detail'));
    });
  };

  const currCoin = coin || coins[0];
  console.log(gear.NUM, coinInfo.ratio);
  // console.log(downFixed(gear.NUM / coinInfo.ratio, 8));
  return (
    <div className={styles.buySupporting} onClick={() => setShowMenus(false)}>
      <Header
        icon={Icons.arrowLeft}
        title={formatMessage({ id: `BUY_TITLE` })}
        rightContent={{
          text: formatMessage({ id: `BUY_DETAIL_TITLE` }),
          textStyle: { color: '#F3AF66' },
          onHandle: () => router.push('/home/order-detail'),
        }}
      />
      <section>
        <div className={styles.label}>{formatMessage({ id: `BUY_STALLS` })}（USDT）</div>
        <ul className={styles.gears}>
          {gears.map(i => (
            <li key={i.NUM} className={i.LEVEL === gear.LEVEL ? styles.active : ''}>
              <span onClick={() => setGear(i)}>{i.NUM}</span>
            </li>
          ))}
        </ul>
        <div className={styles.income}>
          <p>
            <span>{formatMessage({ id: `BUY_TOTAL_REVENUE` })}</span>
            <span>
              {gear.EST} EST + {gear.RC} RC + {gear.USDT} USDT
            </span>
          </p>
          <p>
            <small>
              {formatMessage({ id: `BUY_TOTAL_REVENUE_DESC` })}
              {gear.RATIO}%
            </small>
          </p>
        </div>
      </section>
      <section>
        <div className={styles.label}>{formatMessage({ id: `OTC_PAY_COIN` })}</div>
        <div className={styles.payment}>
          <div className={styles.coin}>
            <div
              className={styles.select}
              onClick={e => {
                setShowMenus(!showMenus);
                e.stopPropagation();
              }}
            >
              <span>{currCoin}</span>
              <img src={Icons.arrowDown} alt="" />
            </div>
            {showMenus && (
              <div className={styles.options}>
                <Menus
                  menus={coins.map(i => ({ label: i, value: i }))}
                  active={currCoin}
                  textAlign="left"
                  onHandle={menu => {
                    // console.log(menu.value);
                    setCoin(menu.value);
                    setShowMenus(false);
                  }}
                  isFull={true}
                  maxWidth="auto"
                />
              </div>
            )}
          </div>
          <aside>
            {getLocale() === 'en-US'
              ? `${coinInfo.currency}${formatMessage({ id: `EXCHANGE_CAN_USE` })} `
              : `${formatMessage({ id: `EXCHANGE_CAN_USE` })} ${coinInfo.currency}`}
            ：{`${downFixed(coinInfo.balance)}`}
          </aside>
        </div>
        <div className={styles.row}>
          <span>{formatMessage({ id: `OTC_RATE` })}</span>
          <span>
            {downFixed(coinInfo.ratio, 8)} {coinInfo.currency}/USDT
          </span>
        </div>
        <div className={styles.row}>
          <span>{formatMessage({ id: `OTC_CONSUMPTION` })}</span>
          <span>
            {coinInfo.ratio ? downFixed(gear.NUM * coinInfo.ratio, 8) : '--'} {coinInfo.currency}
          </span>
        </div>
      </section>
      <section className={styles.btnBox}>
        <button onClick={() => buySupporting()}>{formatMessage({ id: `BUY_CONFIRM` })}</button>
      </section>
    </div>
  );
}

export default BuySupporting;
