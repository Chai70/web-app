import { View } from '@tarojs/components';
import { FC } from 'react';
import './index.scss';

/**
 * 简化版K线图数据接口
 */
interface KLineChartProps {
  /** 简化数据结构，只需要一个数字数组表示价格变化 */
  data: number[];
  /** 是否自动适应容器大小 */
  autoSize?: boolean;
}

/**
 * 适用于Taro的简化版K线图组件
 * 由于小程序环境不支持复杂的Canvas库如lightweight-charts
 * 这里使用简单的View组件模拟K线效果
 */
const KLineChart: FC<KLineChartProps> = ({ data = [] }) => {
  // 确保有数据
  const hasData = data && data.length > 0;
  
  // 如果没有数据，显示一个占位区域
  if (!hasData) {
    return (
      <View className='k-line-chart'>
        <View 
          className='chart-placeholder' 
          style={{ 
            backgroundColor: '#1a2736', 
            height: '30px' 
          }} 
        />
      </View>
    );
  }
  
  // 我们不需要单独计算变化，直接在渲染时判断
  
  // 计算最大值和最小值，用于更好地缩放图表
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const valueRange = maxValue - minValue;
  
  return (
    <View className='k-line-chart'>
      <View className='simple-kline'>
        {data.map((value, index) => {
          // 计算高度百分比，使图表更有变化
          // 如果数据范围很小，添加一个基础高度以使图表更明显
          const heightPercent = valueRange === 0 ? 70 : 
            30 + ((value - minValue) / valueRange * 70);
          
          // 判断是上涨还是下跌
          const isUp = index === 0 ? true : value >= data[index - 1];
          
          return (
            <View 
              key={index}
              className={`kline-bar ${isUp ? 'up' : 'down'}`}
              style={{ height: `${heightPercent}%` }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default KLineChart;