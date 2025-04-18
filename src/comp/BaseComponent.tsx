import { View } from '@tarojs/components'
import React from 'react'

interface BaseComponentProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * 基础组件，可以被其他页面引用
 */
export default function BaseComponent({ children, className = '' }: BaseComponentProps) {
  return (
    <View className={className}>
      {children}
    </View>
  )
}
