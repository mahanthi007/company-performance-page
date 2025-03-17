import React from 'react';
import StockOverview from '@/components/StockOverview';
import StockChart from '@/components/StockChart';
import FinancialMetrics from '@/components/FinancialMetrics';
import CompanyInfo from '@/components/CompanyInfo';
import FinancialTables from '@/components/FinancialTables';
import AnalystRatings from '@/components/AnalystRatings';
import NewsSection from '@/components/NewsSection';

// Mock data for demonstration purposes
// In a real application, this would come from an API
const stockData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (30 - i));
  
  // Generate a somewhat realistic stock price pattern
  const basePrice = 150;
  const variance = Math.sin(i / 3) * 15 + (Math.random() * 10 - 5);
  const price = basePrice + variance;
  
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price,
    volume: Math.floor(Math.random() * 10000000)
  };
});

const keyMetrics = [
  {
    label: 'P/E Ratio',
    value: '24.5',
    change: 1.2,
    tooltip: 'Price-to-Earnings Ratio: Measures current share price relative to per-share earnings'
  },
  {
    label: 'EPS',
    value: '$6.42',
    change: 8.5,
    tooltip: 'Earnings Per Share: Net income divided by outstanding shares'
  },
  {
    label: 'Debt to Equity',
    value: '1.15',
    change: -3.2,
    tooltip: 'Debt to Equity Ratio: Total liabilities divided by shareholder equity'
  },
  {
    label: 'Dividend Yield',
    value: '1.85%',
    change: 0.3,
    tooltip: 'Annual dividend payments relative to stock price'
  },
  {
    label: 'ROE',
    value: '27.8%',
    change: 2.1,
    tooltip: 'Return on Equity: Net income as a percentage of shareholder equity'
  }
];

const quarterlyData = [
  { quarter: 'Q3 2023', revenue: 89.58, netProfit: 22.96, ebitda: 30.33 },
  { quarter: 'Q2 2023', revenue: 81.80, netProfit: 19.88, ebitda: 28.41 },
  { quarter: 'Q1 2023', revenue: 94.84, netProfit: 24.16, ebitda: 32.20 },
  { quarter: 'Q4 2022', revenue: 117.15, netProfit: 29.99, ebitda: 38.73 },
  { quarter: 'Q3 2022', revenue: 90.15, netProfit: 20.72, ebitda: 29.25 }
];

const annualData = [
  { year: '2022', assets: 352.76, liabilities: 287.91, equity: 64.85 },
  { year: '2021', assets: 351.00, liabilities: 287.53, equity: 63.47 },
  { year: '2020', assets: 323.89, liabilities: 258.55, equity: 65.34 },
  { year: '2019', assets: 338.52, liabilities: 241.98, equity: 96.54 },
  { year: '2018', assets: 365.73, liabilities: 258.58, equity: 107.15 }
];

const ratios = [
  { metric: 'P/E Ratio', value: 24.5, previousValue: 23.3, percentChange: 5.15 },
  { metric: 'PEG Ratio', value: 1.32, previousValue: 1.47, percentChange: -10.20 },
  { metric: 'ROE', value: 27.8, previousValue: 25.3, percentChange: 9.88 },
  { metric: 'Debt to Equity', value: 1.15, previousValue: 1.23, percentChange: -6.50 },
  { metric: 'Current Ratio', value: 1.45, previousValue: 1.32, percentChange: 9.85 },
  { metric: 'Dividend Yield', value: 1.85, previousValue: 1.72, percentChange: 7.56 }
];

const analystRatings = {
  ratings: {
    buy: 28,
    hold: 14,
    sell: 3
  },
  priceTarget: {
    low: 145.00,
    high: 210.00,
    average: 186.50,
    current: 165.23
  },
  comments: [
    {
      analyst: 'Sarah Johnson',
      firm: 'Morgan Stanley',
      comment: 'Strong fundamentals and product pipeline support our bullish outlook despite macro headwinds.',
      date: 'Oct 15, 2023',
      rating: 'Buy' as const
    },
    {
      analyst: 'Michael Chen',
      firm: 'Goldman Sachs',
      comment: 'We maintain our Hold rating as valuation appears fair given current growth prospects.',
      date: 'Oct 10, 2023',
      rating: 'Hold' as const
    },
    {
      analyst: 'Jessica Williams',
      firm: 'JP Morgan',
      comment: 'Recent product launches exceeded expectations; raising our price target to $195.',
      date: 'Oct 5, 2023',
      rating: 'Buy' as const
    },
    {
      analyst: 'David Miller',
      firm: 'Bank of America',
      comment: 'Margin pressure from higher input costs may impact profitability in coming quarters.',
      date: 'Sept 28, 2023',
      rating: 'Hold' as const
    },
    {
      analyst: 'Robert Chang',
      firm: 'Citigroup',
      comment: 'Competition in key markets intensifying, we see limited upside at current valuation.',
      date: 'Sept 22, 2023',
      rating: 'Sell' as const
    }
  ]
};

const newsItems = [
  {
    title: 'Apple Unveils New iPhone with Revolutionary Camera Technology',
    source: 'TechCrunch',
    timestamp: '2 hours ago',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1592002616527-0d6b55070394?q=80&w=800&h=600',
    summary: 'Apple\'s latest iPhone features breakthrough camera technology that promises to revolutionize mobile photography with computational imaging capabilities.'
  },
  {
    title: 'Apple Reports Record Fourth Quarter Results',
    source: 'CNBC',
    timestamp: '1 day ago',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=600',
    summary: 'Apple announced financial results for its fiscal 2023 fourth quarter, with quarterly revenue of $89.5 billion, up 8% year over year.'
  },
  {
    title: 'Apple\'s AR Headset Expected to Launch in Early 2024',
    source: 'Bloomberg',
    timestamp: '2 days ago',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=800&h=600',
    summary: 'Sources familiar with the matter say Apple\'s long-awaited augmented reality headset is now expected to launch in Q1 2024 after several delays.'
  },
  {
    title: 'Apple Expands AI Capabilities with New Acquisition',
    source: 'Reuters',
    timestamp: '3 days ago',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&h=600',
    summary: 'Apple has acquired an AI startup specializing in natural language processing to enhance Siri and other AI features across its product lineup.'
  },
  {
    title: 'Apple\'s Services Revenue Grows 21% Year-Over-Year',
    source: 'Financial Times',
    timestamp: '4 days ago',
    url: '#',
    summary: 'Apple\'s services segment, which includes App Store, Apple Music, and Apple TV+, continues to show strong growth as the company diversifies beyond hardware.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StockOverview 
          companyName="Apple Inc."
          ticker="AAPL"
          price={165.23}
          change={2.35}
          changePercent={1.44}
          marketCap="$2.65T"
          open={163.59}
          prevClose={162.88}
          dayHigh={166.45}
          dayLow={163.01}
          weekHigh={198.23}
          weekLow={124.17}
          volume="56.4M"
        />
        
        <div className="mt-6">
          <StockChart data={stockData} />
        </div>
        
        <div className="mt-6">
          <FinancialMetrics metrics={keyMetrics} />
        </div>
        
        <div className="mt-6">
          <CompanyInfo 
            name="Apple Inc."
            logo="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/505px-Apple_logo_black.svg.png"
            description="Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services."
            sector="Technology"
            industry="Consumer Electronics"
            headquarters="Cupertino, California, USA"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="col-span-1 md:col-span-2">
            <FinancialTables 
              quarterlyData={quarterlyData}
              annualData={annualData}
              ratios={ratios}
            />
          </div>
          <div className="col-span-1">
            <NewsSection news={newsItems} />
          </div>
        </div>
        
        <div className="mt-6">
          <AnalystRatings 
            ratings={analystRatings.ratings}
            priceTarget={analystRatings.priceTarget}
            comments={analystRatings.comments}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
