
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StockOverviewProps {
  companyName: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  open: number;
  prevClose: number;
  dayHigh: number;
  dayLow: number;
  weekHigh: number;
  weekLow: number;
  volume: string;
}

const StockOverview: React.FC<StockOverviewProps> = ({
  companyName,
  ticker,
  price,
  change,
  changePercent,
  marketCap,
  open,
  prevClose,
  dayHigh,
  dayLow,
  weekHigh,
  weekLow,
  volume,
}) => {
  const isPositive = change >= 0;
  
  return (
    <div className="animate-fade-in w-full opacity-0" style={{ '--index': 0 } as React.CSSProperties}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{companyName}</h1>
            <span className="text-sm md:text-base font-medium text-muted-foreground">{ticker}</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <div className="flex items-center">
            <span className="text-2xl md:text-3xl font-semibold">${price.toFixed(2)}</span>
            <div className={`ml-3 flex items-center ${isPositive ? 'text-positive' : 'text-negative'}`}>
              {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              <span className="ml-1 font-medium">${Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
        <MetricItem 
          label="Market Cap" 
          value={marketCap} 
          tooltip="Total market value of a company's outstanding shares"
        />
        <MetricItem 
          label="Open" 
          value={`$${open.toFixed(2)}`} 
          tooltip="Price at market open"
        />
        <MetricItem 
          label="Prev Close" 
          value={`$${prevClose.toFixed(2)}`} 
          tooltip="Previous day's closing price"
        />
        <MetricItem 
          label="Day High/Low" 
          value={`$${dayHigh.toFixed(2)} / $${dayLow.toFixed(2)}`} 
          tooltip="Highest and lowest price during the trading day"
        />
        <MetricItem 
          label="52W High/Low" 
          value={`$${weekHigh.toFixed(2)} / $${weekLow.toFixed(2)}`} 
          tooltip="Highest and lowest price over the past 52 weeks"
        />
        <MetricItem 
          label="Volume" 
          value={volume} 
          tooltip="Number of shares traded"
          className="md:col-span-2 lg:col-span-1"
        />
      </div>
    </div>
  );
};

interface MetricItemProps {
  label: string;
  value: string | number;
  tooltip?: string;
  className?: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value, tooltip, className = "" }) => {
  return (
    <div className={`bg-card border rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center justify-center h-5 w-5">
                  <Info size={14} className="text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-base md:text-lg font-medium">{value}</p>
    </div>
  );
};

export default StockOverview;
