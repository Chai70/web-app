import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Create() {
  useLoad(() => {
    console.log('Create page loaded.')
  })

  return (
    <View className='create'>
      <Text>创建页面</Text>
    </View>
  )
}
