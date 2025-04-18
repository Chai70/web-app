import { View, Text, Swiper, SwiperItem, Image, Input, Icon } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'

export default function Home () {
  // 搜索词
  const [searchTerm, setSearchTerm] = useState('');
  
  // 跑马灯数据
  const [noticeList] = useState([
    '热烈庆祝新品上线，限时8折优惠！',
    '恭喜用户张三获得本周幸运大奖',
    '系统将于本周六凌晨2点进行维护升级',
    '新用户注册即送100积分'
  ]);
  
  // 轮播图数据
  const [bannerList] = useState([
    { id: 1, imageUrl: 'https://picsum.photos/800/400?random=1', title: '精选活动' },
    { id: 2, imageUrl: 'https://picsum.photos/800/400?random=2', title: '新品推荐' },
    { id: 3, imageUrl: 'https://picsum.photos/800/400?random=3', title: '限时特惠' },
    { id: 4, imageUrl: 'https://picsum.photos/800/400?random=4', title: '热门商品' }
  ]);
  
  // 当前显示的公告索引
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  
  // 跑马灯效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % noticeList.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [noticeList.length]);
  
  useLoad(() => {
    console.log('Home page loaded.');
  });

  return (
    <View className='home'>
      {/* 顶部跑马灯 */}
      <View className='notice-bar'>
        <View className='notice-icon'>📢</View>
        <View className='notice-content'>
          <Text className='notice-text'>{noticeList[currentNoticeIndex]}</Text>
        </View>
      </View>
      
      {/* 轮播图 */}
      <Swiper
        className='banner-swiper'
        indicatorColor='#999'
        indicatorActiveColor='#1296db'
        circular
        indicatorDots
        autoplay
      >
        {bannerList.map(banner => (
          <SwiperItem key={banner.id}>
            <View className='banner-item'>
              <Image className='banner-image' src={banner.imageUrl} mode='aspectFill' />
              <View className='banner-title'>{banner.title}</View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      
      {/* 内容区域 */}
      <View className='content-section'>
        {/* 搜索栏 */}
        <View className='search-bar'>
          <View className='search-input-container'>
            <View className='search-icon'>
              <Icon type='search' />
            </View>
            <Input
              type='text'
              placeholder='TIDE X Heroes'
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.detail.value)}
              className='search-input'
            />
          </View>
        </View>
      </View>
    </View>
  )
}
