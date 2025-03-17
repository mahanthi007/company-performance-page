
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FinancialTablesProps {
  quarterlyData: {
    quarter: string;
    revenue: number;
    netProfit: number;
    ebitda: number;
  }[];
  annualData: {
    year: string;
    assets: number;
    liabilities: number;
    equity: number;
  }[];
  ratios: {
    metric: string;
    value: number;
    previousValue: number;
    percentChange: number;
  }[];
}

const FinancialTables: React.FC<FinancialTablesProps> = ({ 
  quarterlyData, 
  annualData,
  ratios
}) => {
  return (
    <div className="bg-card border rounded-xl p-1 animate-fade-in-delayed opacity-0" style={{ '--index': 0 } as React.CSSProperties}>
      <Tabs defaultValue="quarterly" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="quarterly">Quarterly Results</TabsTrigger>
            <TabsTrigger value="annual">Annual Balance Sheet</TabsTrigger>
            <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="quarterly" className="p-4">
          <h3 className="text-lg font-medium mb-3">Quarterly Financial Summary</h3>
          <div className="overflow-x-auto">
            <table className="financial-table">
              <thead>
                <tr>
                  <th>Quarter</th>
                  <th>Revenue</th>
                  <th>Net Profit</th>
                  <th>EBITDA</th>
                </tr>
              </thead>
              <tbody>
                {quarterlyData.map((item, index) => (
                  <tr key={index}>
                    <td className="font-medium">{item.quarter}</td>
                    <td>${formatNumber(item.revenue)}M</td>
                    <td>${formatNumber(item.netProfit)}M</td>
                    <td>${formatNumber(item.ebitda)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="annual" className="p-4">
          <h3 className="text-lg font-medium mb-3">Annual Balance Sheet</h3>
          <div className="overflow-x-auto">
            <table className="financial-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Total Assets</th>
                  <th>Total Liabilities</th>
                  <th>Shareholder Equity</th>
                </tr>
              </thead>
              <tbody>
                {annualData.map((item, index) => (
                  <tr key={index}>
                    <td className="font-medium">{item.year}</td>
                    <td>${formatNumber(item.assets)}M</td>
                    <td>${formatNumber(item.liabilities)}M</td>
                    <td>${formatNumber(item.equity)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="ratios" className="p-4">
          <h3 className="text-lg font-medium mb-3">Key Financial Ratios</h3>
          <div className="overflow-x-auto">
            <table className="financial-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Current Value</th>
                  <th>Previous Period</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                {ratios.map((item, index) => (
                  <tr key={index}>
                    <td className="font-medium">{item.metric}</td>
                    <td>{item.value.toFixed(2)}</td>
                    <td>{item.previousValue.toFixed(2)}</td>
                    <td className={item.percentChange > 0 ? 'positive-value' : item.percentChange < 0 ? 'negative-value' : ''}>
                      {item.percentChange > 0 && '+'}
                      {item.percentChange.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to format numbers
const formatNumber = (num: number): string => {
  return num.toFixed(2);
};

export default FinancialTables;
