import { View, Text } from '@tarojs/components';
import { FC } from 'react';
import './StockTicker.css';

interface StockData {
  symbol: string;
  price: string;
  change: string;
  status: 'up' | 'down' | 'neutral';
}

interface StockTickerProps {
  stockData: StockData[];
}

const StockTicker: FC<StockTickerProps> = ({ stockData }) => {
  return (
    <View className='ticker-wrap glass-effect'>
      <View className='ticker'>
        {[...stockData, ...stockData].map((stock, index) => (
          <View key={index} className={`ticker-item ${stock.status}`}>
            <Text className='font-bold mr-1'>{stock.symbol}</Text>
            <Text>{stock.price}</Text>
            <Text className='ml-1'>{stock.change}
              {stock.status === 'up' ? ' ↑' : stock.status === 'down' ? ' ↓' : ' '}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StockTicker;