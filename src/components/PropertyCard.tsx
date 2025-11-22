import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  title: string;
  price: number;
  area: number;
  rooms: number;
  address: string;
  imageUrl: string;
  propertyType: string;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:gold-glow hover:scale-[1.02] bg-card border-border">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="gold-gradient text-background font-semibold">
            {property.propertyType}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button size="icon" variant="secondary" className="rounded-full bg-card/80 backdrop-blur-sm hover:gold-glow">
            <Icon name="Heart" size={18} />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Icon name="MapPin" size={16} />
          <span className="text-sm">{property.address}</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Icon name="Maximize2" size={16} className="text-primary" />
            <span>{property.area} м²</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Home" size={16} className="text-primary" />
            <span>{property.rooms} комн.</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <div className="text-2xl font-bold text-gold">{formatPrice(property.price)}</div>
          </div>
          <Button className="gold-gradient text-background font-semibold">
            Подробнее
          </Button>
        </div>
      </div>
    </Card>
  );
}
