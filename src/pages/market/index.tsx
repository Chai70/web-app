import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Market() {
  useLoad(() => {
    console.log('Market page loaded.')
  })

  return (
    <View className='market'>
      <Text>市场页面</Text>
    </View>
  )
}
