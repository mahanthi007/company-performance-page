
import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Metric {
  label: string;
  value: string | number;
  change?: number;
  tooltip: string;
}

interface FinancialMetricsProps {
  metrics: Metric[];
}

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in opacity-0" style={{ '--index': 2 } as React.CSSProperties}>
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

interface MetricCardProps extends Metric {}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, tooltip }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
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
      </div>
      <div className="text-lg font-semibold">{value}</div>
      
      {change !== undefined && (
        <div className="flex items-center mt-2">
          {isPositive && <TrendingUp size={14} className="text-positive mr-1" />}
          {isNegative && <TrendingDown size={14} className="text-negative mr-1" />}
          <span className={
            isPositive ? "text-positive text-sm" : 
            isNegative ? "text-negative text-sm" : 
            "text-neutral text-sm"
          }>
            {change > 0 ? '+' : ''}{change}%
          </span>
        </div>
      )}
    </div>
  );
};

export default FinancialMetrics;
