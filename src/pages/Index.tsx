import { useState } from 'react';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import ProfileModal from '@/components/ProfileModal';
import AddPropertyModal from '@/components/AddPropertyModal';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  avatarUrl?: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);

  const mockProperties = [
    {
      id: 1,
      title: 'Элитная квартира с видом на город',
      price: 25000000,
      area: 120,
      rooms: 3,
      address: 'Москва, Пресненская набережная',
      imageUrl: 'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      propertyType: 'Квартира'
    },
    {
      id: 2,
      title: 'Пентхаус в центре',
      price: 45000000,
      area: 200,
      rooms: 4,
      address: 'Москва, Тверская улица',
      imageUrl: 'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      propertyType: 'Пентхаус'
    },
    {
      id: 3,
      title: 'Современная студия',
      price: 12000000,
      area: 45,
      rooms: 1,
      address: 'Москва, Кутузовский проспект',
      imageUrl: 'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      propertyType: 'Студия'
    }
  ];

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onLogout={handleLogout}
        onAddPropertyClick={() => setIsAddPropertyModalOpen(true)}
      />
      
      <Hero onGetStarted={() => setIsAuthModalOpen(true)} />
      
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gold">Премиальная недвижимость</h2>
          <div className="flex gap-3">
            <select className="bg-card border border-border rounded-lg px-4 py-2 text-foreground">
              <option>Все типы</option>
              <option>Квартира</option>
              <option>Пентхаус</option>
              <option>Студия</option>
            </select>
            <select className="bg-card border border-border rounded-lg px-4 py-2 text-foreground">
              <option>Цена: любая</option>
              <option>До 15 млн</option>
              <option>15-30 млн</option>
              <option>Свыше 30 млн</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

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
};

export default Index;