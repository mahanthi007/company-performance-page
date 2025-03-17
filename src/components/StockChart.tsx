
import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

interface StockChartProps {
  data: { date: string; price: number; volume: number }[];
}

type TimeFrame = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'Max';

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeFrame>('1M');
  
  // In a real application, we would filter data based on the timeframe
  // For now, we'll just use the same data
  
  const timeframes: TimeFrame[] = ['1D', '1W', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Max'];
  
  const formatYAxis = (value: number) => `$${value.toFixed(2)}`;
  
  return (
    <div className="chart-container animate-fade-in opacity-0" style={{ '--index': 1 } as React.CSSProperties}>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-medium">Stock Price Performance</h2>
        <div className="flex space-x-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              className={cn("timeframe-button", activeTimeframe === timeframe && "active")}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              minTickGap={30}
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1}
              fill="url(#colorPrice)" 
              strokeWidth={2}
              activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
