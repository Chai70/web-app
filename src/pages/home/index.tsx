import { View, Text, Swiper, SwiperItem, Image, Input, Icon, Button, Picker } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import StockTicker from '../../comp/StockTicker'
import TokenCard, { TokenData } from '../../comp/TokenCard'

// 导入图片
import banner1 from '../../assets/base/banner.png'
import './index.scss'

export default function Home () {
  // 搜索词
  const [searchTerm, setSearchTerm] = useState('');
  // 筛选标签和时间
  const [selectedTag, setSelectedTag] = useState('All Tag');
  const [selectedTime, setSelectedTime] = useState('Creation Time');
  // 复制成功状态
  const [copySuccess, setCopySuccess] = useState('');
  
  // 代币数据
  const [currentTokens] = useState<TokenData[]>([
    {
      id: 1,
      name: 'Bitcoin',
      contract_address: '0x1234567890abcdef1234567890abcdef12345678',
      image: banner1,
      marketCap: '$1.2T',
      holders: '12.5K',
      volume: '$25.6B',
      watchlist: '45.2K',
      t10Percent: '25%',
      dhPercent: '15%',
      kLineData: [1, 2, 3, 4, 5, 6, 7, 8], // 简化的K线图数据
      percentChange: '+5.67%',
      timeFrame: '24h',
      progressPercent: '65%',
      price: '$69,420'
    },
    {
      id: 2,
      name: 'Ethereum',
      contract_address: '0xabcdef1234567890abcdef1234567890abcdef12',
      image: banner1,
      marketCap: '$0.4T',
      holders: '8.3K',
      volume: '$12.1B',
      watchlist: '32.7K',
      t10Percent: '18%',
      dhPercent: '12%',
      kLineData: [5, 4, 3, 4, 5, 6, 7, 8], // 简化的K线图数据
      percentChange: '-2.34%',
      timeFrame: '24h',
      progressPercent: '45%',
      price: '$3,456'
    },
    {
      id: 3,
      name: 'Cardano',
      contract_address: '0xabcdef1234567890abcdef1234567890abcdef12',
      image: banner1,
      marketCap: '$0.4T',
      holders: '8.3K',
      volume: '$12.1B',
      watchlist: '32.7K',
      t10Percent: '18%',
      dhPercent: '12%',
      kLineData: [5, 4, 3, 4, 5, 2, 4, 3], // 简化的K线图数据
      percentChange: '-2.34%',
      timeFrame: '24h',
      progressPercent: '45%',
      price: '$3,456'
    },
    {
      id: 4,
      name: 'Solana',
      contract_address: '0xabcdef1234567890abcdef1234567890abcdef12',
      image: banner1,
      marketCap: '$0.4T',
      holders: '8.3K',
      volume: '$12.1B',
      watchlist: '32.7K',
      t10Percent: '18%',
      dhPercent: '12%',
      kLineData: [5, 4, 3, 4, 5, 4, 7, 5], // 简化的K线图数据
      percentChange: '-2.34%',
      timeFrame: '24h',
      progressPercent: '45%',
      price: '$3,456'
    },
    {
      id: 5,
      name: 'Tether',
      contract_address: '0xabcdef1234567890abcdef1234567890abcdef12',
      image: banner1,
      marketCap: '$0.4T',
      holders: '8.3K',
      volume: '$12.1B',
      watchlist: '32.7K',
      t10Percent: '18%',
      dhPercent: '12%',
      kLineData: [5, 4, 3, 4, 5, 7, 3, 2], // 简化的K线图数据
      percentChange: '-2.34%',
      timeFrame: '24h',
      progressPercent: '45%',
      price: '$3,456'
    }
  ]);
  
  // 复制到剪贴板函数
  const copyToClipboard = (text: string) => {
    Taro.setClipboardData({
      data: text,
      success: () => {
        setCopySuccess(text);
        setTimeout(() => setCopySuccess(''), 2000);
      }
    });
  };
  
  // 跑马灯数据
  const stockData = [
    { symbol: 'BTC', price: '$69,420', change: '+2.5%', status: 'up' as const },
    { symbol: 'ETH', price: '$3,456', change: '+1.2%', status: 'up' as const },
    { symbol: 'SOL', price: '$142', change: '-0.8%', status: 'down' as const },
    { symbol: 'DOGE', price: '$0.12', change: '+5.3%', status: 'up' as const },
    { symbol: 'SHIB', price: '$0.00002', change: '-1.5%', status: 'down' as const },
    { symbol: 'AVAX', price: '$34.5', change: '+0.3%', status: 'up' as const },
    { symbol: 'MATIC', price: '$0.85', change: '0.0%', status: 'neutral' as const },
  ];
  
  // 轮播图数据
  const [bannerList] = useState([
    { id: 1, imageUrl: banner1, title: '精选活动' },
    { id: 2, imageUrl: banner1, title: '新品推荐' },
    { id: 3, imageUrl: banner1, title: '限时特惠' },
    { id: 4, imageUrl: banner1, title: '热门商品' }
  ]);
  
  useLoad(() => {
    console.log('Home page loaded.');
  });

  return (
    <View className='home'>
      {/* 跑马灯 */}
      <StockTicker stockData={stockData} />
      
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
              <Image className='banner-image' src={banner.imageUrl} mode='aspectFit' />
              <View className='banner-title'>{banner.title}</View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      {/* 创建按钮 */}
      <View className='create-button-container'>
        <Button className='create-button' type='primary'>Create Token</Button>
      </View>
      {/* 内容区域 */}
      <View className='content-section'>
        {/* 搜索栏 */}
        <View className='search-bar'>
          <View className='search-input-container'>
            <View className='search-icon'>
              <Icon type='search' size={15} />
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
        {/*筛选框*/}
        <View className='filters'>
          <Picker
            mode='selector'
            range={['All Tag', 'Meme', 'DeFi', 'GameFi']}
            value={['All Tag', 'Meme', 'DeFi', 'GameFi'].indexOf(selectedTag)}
            onChange={(e) => setSelectedTag(['All Tag', 'Meme', 'DeFi', 'GameFi'][e.detail.value])}
            className='filter-picker'
          >
            <View className='picker-item'>
              <Text>{selectedTag}</Text>
            </View>
          </Picker>
          
          <Picker
            mode='selector'
            range={['Creation Time', '最近1小时', '今日', '本周']}
            value={['Creation Time', '最近1小时', '今日', '本周'].indexOf(selectedTime)}
            onChange={(e) => setSelectedTime(['Creation Time', '最近1小时', '今日', '本周'][e.detail.value])}
            className='filter-picker'
          >
            <View className='picker-item'>
              <Text>{selectedTime}</Text>
            </View>
          </Picker>
        </View>
        {/*卡片区域*/}
        <View className='token-cards'>
          {currentTokens.length > 0 ? (
            currentTokens.map((token) => (
              <TokenCard 
                key={token.id} 
                token={token} 
                onCopy={copyToClipboard} 
                copySuccess={copySuccess} 
              />
            ))
          ) : (
            <View className='empty-state'>
              <Text className='empty-text'>没有找到匹配的代币</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
