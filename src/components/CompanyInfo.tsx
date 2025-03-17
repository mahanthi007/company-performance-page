
import React from 'react';
import { Building, MapPin, Briefcase } from 'lucide-react';

interface CompanyInfoProps {
  name: string;
  logo: string;
  description: string;
  sector: string;
  industry: string;
  headquarters: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  name,
  logo,
  description,
  sector,
  industry,
  headquarters,
}) => {
  return (
    <div className="bg-card border rounded-xl p-6 animate-fade-in opacity-0" style={{ '--index': 3 } as React.CSSProperties}>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-md overflow-hidden border">
          <img src={logo} alt={`${name} logo`} className="h-full w-full object-cover" />
        </div>
        <h2 className="text-xl font-medium">{name}</h2>
      </div>
      
      <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Sector</p>
            <p className="text-sm font-medium">{sector}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Building size={16} className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Industry</p>
            <p className="text-sm font-medium">{industry}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Headquarters</p>
            <p className="text-sm font-medium">{headquarters}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
