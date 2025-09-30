

"use client";

import { Trophy, Newspaper, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

type Accolade = {
  icon: string;
  title: string;
  issuer: string;
  description: string;
};

const iconMap: { [key: string]: React.ElementType } = {
    Trophy, Newspaper, Award
};

export function Accolades({ data }: { data?: Accolade[] }) {
  
  if (!data || data.length === 0) {
    return null;
  }

  const renderIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-10 h-10" /> : <Award className="w-10 h-10" />;
  };

  return (
    <section id="awards" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline text-primary">In the Spotlight</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We're proud of our journey and grateful for the recognition our passion has received from the community and industry experts.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((accolade) => (
            <Card key={accolade.title} className="text-center p-8 hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-primary">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                {renderIcon(accolade.icon)}
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">{accolade.title}</h3>
               <p className="text-sm font-semibold text-muted-foreground mb-3">{accolade.issuer}</p>
              <p className="text-muted-foreground text-sm">{accolade.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
