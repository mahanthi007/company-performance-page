
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalystRatingsProps {
  ratings: {
    buy: number;
    hold: number;
    sell: number;
  };
  priceTarget: {
    low: number;
    high: number;
    average: number;
    current: number;
  };
  comments: {
    analyst: string;
    firm: string;
    comment: string;
    date: string;
    rating: 'Buy' | 'Hold' | 'Sell';
  }[];
}

const AnalystRatings: React.FC<AnalystRatingsProps> = ({
  ratings,
  priceTarget,
  comments,
}) => {
  const ratingData = [
    { name: 'Buy', value: ratings.buy, color: '#34C759' },
    { name: 'Hold', value: ratings.hold, color: '#FFCC00' },
    { name: 'Sell', value: ratings.sell, color: '#FF3B30' },
  ];
  
  const totalRatings = ratings.buy + ratings.hold + ratings.sell;
  
  const renderPercentage = (value: number) => {
    return `${Math.round((value / totalRatings) * 100)}%`;
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded p-2 shadow-sm">
          <p className="text-sm">{`${payload[0].name}: ${payload[0].value} (${renderPercentage(payload[0].value)})`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-card border rounded-xl animate-fade-in-delayed opacity-0" style={{ '--index': 1 } as React.CSSProperties}>
      <div className="p-5 border-b">
        <h2 className="text-lg font-medium">Analyst Ratings & Outlook</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
        <div>
          <h3 className="text-base font-medium mb-4">Rating Breakdown</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${renderPercentage(value)}`}
                  labelLine={false}
                >
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-5">
            <h3 className="text-base font-medium mb-3">12-Month Price Target</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Low</p>
                <p className="text-lg font-medium">${priceTarget.low.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-lg font-medium">${priceTarget.average.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High</p>
                <p className="text-lg font-medium">${priceTarget.high.toFixed(2)}</p>
              </div>
            </div>
            <div className="relative w-full h-2 bg-secondary rounded-full mt-3 overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-primary" style={{ 
                width: `${(priceTarget.current / priceTarget.high) * 100}%` 
              }}></div>
              <div className="absolute top-[-5px] w-2 h-4 bg-neutral rounded-full" style={{ 
                left: `calc(${(priceTarget.low / priceTarget.high) * 100}% - 4px)` 
              }}></div>
              <div className="absolute top-[-5px] w-2 h-4 bg-neutral rounded-full" style={{ 
                left: `calc(${(priceTarget.average / priceTarget.high) * 100}% - 4px)` 
              }}></div>
              <div className="absolute top-[-5px] w-2 h-4 bg-foreground rounded-full" style={{ 
                left: `calc(${(priceTarget.current / priceTarget.high) * 100}% - 4px)` 
              }}></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">$0</span>
              <span className="text-xs text-muted-foreground">${priceTarget.high.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-medium mb-4">Recent Analyst Comments</h3>
          <div className="overflow-y-auto max-h-[320px] pr-1 space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.analyst}</span>
                    <span className="text-xs text-muted-foreground">({comment.firm})</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    comment.rating === 'Buy' ? 'bg-positive/10 text-positive' : 
                    comment.rating === 'Sell' ? 'bg-negative/10 text-negative' : 
                    'bg-neutral/10 text-neutral'
                  }`}>
                    {comment.rating}
                  </span>
                </div>
                <p className="text-sm mb-1">{comment.comment}</p>
                <p className="text-xs text-muted-foreground">{comment.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystRatings;
