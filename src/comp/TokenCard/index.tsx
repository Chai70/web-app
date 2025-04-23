import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC } from 'react'
import './index.scss'
import priceIcon from '../../assets/base/price.png'
import copyIcon from '../../assets/base/copy.png'
import KLineChart from '../KLineChart'

// 代币数据接口
export interface TokenData {
  id: number
  name: string
  contract_address: string
  image: string
  marketCap: string
  holders: string
  volume: string
  watchlist: string
  t10Percent: string
  dhPercent: string
  kLineData: number[]
  percentChange: string
  timeFrame: string
  progressPercent: string
  price: string
}

interface TokenCardProps {
  token: TokenData
  onCopy?: (address: string) => void
  copySuccess?: string
}

const TokenCard: FC<TokenCardProps> = ({ token, onCopy, copySuccess }) => {
  // 复制到剪贴板
  const handleCopy = () => {
    if (onCopy) {
      onCopy(token.contract_address)
    } else {
      Taro.setClipboardData({
        data: token.contract_address,
        success: () => {
          Taro.showToast({
            title: '已复制',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }

  return (
    <View className='token-card'>
      {/* 卡片头部 */}
      <View className='card-header'>
        <View className='header-left'>
          <Text className='token-name'>{token.name}</Text>
          <Text className='token-address'>
            {token.contract_address ? 
              `${token.contract_address.substring(0, 6)}...${token.contract_address.substring(token.contract_address.length - 4)}` : 
              ''}
          </Text>
          <View 
            onClick={handleCopy}
            className='copy-button'
          >
            <View className='copy-icon'>
              <Image src={copyIcon} className='copy-icon-image' mode='aspectFit' />
            </View>
            {copySuccess === token.contract_address && (
              <View className='copy-tooltip'>
                <Text>copied</Text>
              </View>
            )}
          </View>
        </View>
        <View className='header-right'>
          <View className='action-button'>
            <Text className='at-icon at-icon-search'></Text>
          </View>
          <View className='action-button'>
            <Text className='at-icon at-icon-star'></Text>
          </View>
        </View>
      </View>
      
      {/* 卡片内容 */}
      <View className='card-content'>
        {/* 中间数据区域 */}
        <View className='content-row'>
          {/* 左侧 - 代币图标 */}
          <View className='token-image-container'>
            <View onClick={() => Taro.navigateTo({ url: `/pages/trading/index?contract_address=${token.contract_address}` })}>
              <Image src={token.image} className='token-image' mode='aspectFit' />
            </View>
          </View>
          
          {/* 中间 - 统计数据 */}
          <View className='token-stats'>
            <View className='stats-container'>
              {/* 第一行 */}
              <View className='stats-row'>
                <View className='stat-item'>
                  <Text className='stat-label'>MC:</Text>
                  <Text className='stat-value green'>{token.marketCap}</Text>
                </View>
                
                <View className='stat-item'>
                  <View className='stat-icon-container'>
                    <Text className='at-icon at-icon-user'></Text>
                    <Text className='stat-value yellow'>{token.holders}</Text>
                  </View>
                </View>
              </View>

              {/* 第二行 */}
              <View className='stats-row'>
                <View className='stat-item'>
                  <Text className='stat-label'>Vol:</Text>
                  <Text className='stat-value green'>{token.volume}</Text>
                </View>
                
                <View className='stat-item'>
                  <View className='stat-icon-container'>
                    <Text className='at-icon at-icon-eye'></Text>
                    <Text className='stat-value yellow'>{token.watchlist}</Text>
                  </View>
                </View>
              </View>

              {/* 第三行 */}
              <View className='stats-row'>
                <View className='stat-item'>
                  <Text className='stat-label'>T10:</Text>
                  <Text className='stat-value green'>{token.t10Percent}</Text>
                </View>

                <View className='stat-item'>
                  <Text className='stat-label'>DH</Text>
                  <Text className='stat-value yellow'>{token.dhPercent}</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* 右侧 - K线图和变化百分比 */}
          <View className='chart-section'>
            {token.kLineData && (
              <View className='chart-container'>
                <KLineChart 
                  data={token.kLineData} 
                  autoSize
                />
              </View>
            )}
            <View className='percent-change'>
              <Text className={token.percentChange.startsWith('+') ? 'green' : 'red'}>
                {token.percentChange}
              </Text>
            </View>
          </View>
        </View>
        
        {/* 底部进度条和价格 */}
        <View className='bottom-section'>
          <View className='bottom-content'>
            {/* 左侧 - 进度条组 */}
            <View className='progress-section'>
              {/* 绿色进度条 */}
              <View className='progress-item'>
                <View className='progress-header'>
                  <Text className='time-frame'>{token.timeFrame}</Text>
                  <Text className='progress-percent'>{token.progressPercent}</Text>
                </View>
                <View className='progress-bar-bg'>
                  <View className='progress-bar-green' style={{ width: token.progressPercent }}></View>
                </View>
              </View>

              {/* 黄色进度条 */}
              <View className='progress-item'>
                <View className='progress-header'>
                  <Text className='time-frame'>{token.timeFrame}</Text>
                  <Text className='progress-percent'>{token.progressPercent}</Text>
                </View>
                <View className='progress-bar-bg'>
                  <View className='progress-bar-yellow' style={{ width: token.progressPercent }}></View>
                </View>
              </View>
            </View>

            {/* 右侧 - 价格标签 */}
            <View className='price-section'>
              <View className='price-badge'>
                <View className='price-icon'>
                  <Image src={priceIcon} className='price-icon-image' mode='aspectFit' />
                </View>
                <Text className='price-text'>{token.price}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default TokenCard
