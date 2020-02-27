import React, { Component } from 'react';
import ARROW_LEFT from '@/assets/dark/arrow-left.png';
import PageHeader from '@/components/common/PageHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PAGE_SIZE } from '../../../utils/constants';
import dayjs from 'dayjs';
import { connect } from 'dva';
import styles from './index.less';

const list = [
  {
    id: 1,
    title: '1测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 2,
    title: '2测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 3,
    title: '3测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 4,
    title: '4测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 5,
    title: '5测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 6,
    title: '6测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 7,
    title: '7测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 8,
    title: '8测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 9,
    title: '9测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
  {
    id: 10,
    title: '10测试上线',
    linkUrl:
      'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    content: '',
    addTime: 1575944459,
  },
];
@connect(({ notices }) => ({ notices }))
class Index extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getMore();
  }

  getMore = () => {
    const {
      dispatch,
      notices: { noticesList, pageIndex },
    } = this.props;

    dispatch({
      type: 'notices/GetNoticelist',
      payload: {
        pageIndex,
        row: PAGE_SIZE,
      },
    }).then(res => {
      // console.log(list.length === 0 ? list : noticesList.concat(list));

      dispatch({
        type: 'notices/UpdateState',
        payload: {
          // noticesList: res.data.length >= 0 ? noticesList.concat(res.data) : res.data,
          noticesList: list.length !== 0 ? noticesList.concat(list) : list,
          pageIndex: noticesList.length !== 0 ? pageIndex + 1 : pageIndex,
          hasMore: true,
        },
      });
    });
  };

  render() {
    const {
      notices: { noticesList, hasMore },
    } = this.props;
    return (
      <div id={styles.notices}>
        <PageHeader title="公告列表" leftContent={{ icon: ARROW_LEFT }} />
        <div className={styles.list}>
          <InfiniteScroll
            dataLength={noticesList.length}
            hasMore={hasMore}
            next={this.getMore}
            loader={<div>Loading...</div>}
            // useWindow={true}
          >
            {noticesList.map((item, key) => (
              <div key={key} className={styles.item}>
                <p>{item.title}</p>
                <small>{dayjs(item.addTime).format('YYYY-MM-DD')}</small>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default Index;
