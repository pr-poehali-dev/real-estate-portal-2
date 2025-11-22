import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';
import AuthModal from '@/components/AuthModal';
import ProfileModal from '@/components/ProfileModal';
import AddPropertyModal from '@/components/AddPropertyModal';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  avatarUrl?: string;
}

interface Property {
  id: number;
  title: string;
  price: number;
  area: number;
  rooms: number;
  address: string;
  imageUrl: string;
  propertyType: string;
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const mockProperties: Property[] = [
    {
      id: 1,
      title: 'Элитная квартира с видом на город',
      price: 25000000,
      area: 120,
      rooms: 3,
      address: 'Москва, Пресненская набережная',
      imageUrl: 'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      propertyType: 'Квартира',
      latitude: 55.7489,
      longitude: 37.5386
    },
    {
      id: 2,
      title: 'Пентхаус в центре',
      price: 45000000,
      area: 200,
      rooms: 4,
      address: 'Москва, Тверская улица',
      imageUrl: 'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      propertyType: 'Пентхаус',
      latitude: 55.7644,
      longitude: 37.6054
    },
    {
      id: 3,
      title: 'Современная студия',
      price: 12000000,
      area: 45,
      rooms: 1,
      address: 'Москва, Кутузовский проспект',
      imageUrl: 'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      propertyType: 'Студия',
      latitude: 55.7407,
      longitude: 37.5365
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=your-api-key&lang=ru_RU';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(() => {
        if (!mapRef.current) return;

        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.7522, 37.6156],
          zoom: 11,
          controls: ['zoomControl', 'fullscreenControl']
        });

        mockProperties.forEach((property) => {
          const placemark = new window.ymaps.Placemark(
            [property.latitude, property.longitude],
            {
              balloonContent: `
                <div style="padding: 10px; max-width: 250px;">
                  <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">${property.title}</h3>
                  <p style="margin: 0 0 8px; color: #D4AF37; font-size: 18px; font-weight: 700;">
                    ${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(property.price)}
                  </p>
                  <p style="margin: 0; color: #666; font-size: 14px;">${property.area} м² • ${property.rooms} комн.</p>
                </div>
              `
            },
            {
              preset: 'islands#goldDotIcon',
              iconColor: '#D4AF37'
            }
          );

          placemark.events.add('click', () => {
            setSelectedProperty(property);
          });

          map.geoObjects.add(placemark);
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onLogout={handleLogout}
        onAddPropertyClick={() => setIsAddPropertyModalOpen(true)}
      />

      <div className="flex-1 relative">
        <div ref={mapRef} className="absolute inset-0" />

        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-card/95 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
            <div className="flex gap-3 flex-wrap">
              <select className="bg-background border border-border rounded-lg px-4 py-2 text-foreground">
                <option>Все типы</option>
                <option>Квартира</option>
                <option>Пентхаус</option>
                <option>Студия</option>
              </select>
              <select className="bg-background border border-border rounded-lg px-4 py-2 text-foreground">
                <option>Цена: любая</option>
                <option>До 15 млн</option>
                <option>15-30 млн</option>
                <option>Свыше 30 млн</option>
              </select>
              <select className="bg-background border border-border rounded-lg px-4 py-2 text-foreground">
                <option>Площадь: любая</option>
                <option>До 50 м²</option>
                <option>50-100 м²</option>
                <option>Свыше 100 м²</option>
              </select>
              <Button className="gold-gradient text-background font-semibold">
                <Icon name="Filter" size={18} className="mr-2" />
                Применить
              </Button>
            </div>
          </div>
        </div>

        {selectedProperty && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4">
            <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-border shadow-xl animate-scale-in">
              <div className="relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm"
                  onClick={() => setSelectedProperty(null)}
                >
                  <Icon name="X" size={18} />
                </Button>
                <PropertyCard property={selectedProperty} />
              </div>
            </div>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={setUser}
      />

      <AddPropertyModal
        isOpen={isAddPropertyModalOpen}
        onClose={() => setIsAddPropertyModalOpen(false)}
        userId={user?.id}
      />
    </div>
  );
}
