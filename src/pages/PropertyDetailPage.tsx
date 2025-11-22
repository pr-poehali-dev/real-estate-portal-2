import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import ProfileModal from '@/components/ProfileModal';
import AddPropertyModal from '@/components/AddPropertyModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  avatarUrl?: string;
}

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const mockProperty = {
    id: Number(id) || 1,
    title: 'Элитная квартира с видом на город',
    price: 25000000,
    area: 120,
    rooms: 3,
    floor: 15,
    totalFloors: 25,
    address: 'Москва, Пресненская набережная, д. 12',
    propertyType: 'Квартира',
    description: 'Роскошная квартира в престижном жилом комплексе с панорамными окнами и потрясающим видом на Москву-Сити. Современный ремонт, дизайнерская мебель, высокие потолки. Развитая инфраструктура района, парковка, консьерж-сервис.',
    images: [
      'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
      'https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/53ddbc4c-6730-4528-be8d-eebabefbe5a2.jpg',
    ],
    owner: {
      firstName: 'Иван',
      lastName: 'Петров',
      phone: '+7 (900) 123-45-67',
      avatarUrl: ''
    },
    features: [
      'Панорамные окна',
      'Высокие потолки 3.2м',
      'Дизайнерский ремонт',
      'Встроенная кухня',
      'Кондиционеры',
      'Теплый пол',
      'Видеодомофон',
      'Подземная парковка'
    ]
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

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

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          Назад к списку
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src={mockProperty.images[selectedImage]}
                alt={mockProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="gold-gradient text-background font-semibold text-lg px-4 py-2">
                  {mockProperty.propertyType}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {mockProperty.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary gold-glow' : 'border-border'
                  }`}
                >
                  <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h1 className="text-3xl font-bold mb-4 text-foreground">{mockProperty.title}</h1>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Icon name="MapPin" size={20} />
                <span className="text-lg">{mockProperty.address}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="Maximize2" size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Площадь</div>
                    <div className="font-semibold">{mockProperty.area} м²</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Home" size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Комнат</div>
                    <div className="font-semibold">{mockProperty.rooms}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Building" size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Этаж</div>
                    <div className="font-semibold">{mockProperty.floor} из {mockProperty.totalFloors}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Класс</div>
                    <div className="font-semibold">Премиум</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-xl font-bold mb-3">Описание</h2>
                <p className="text-muted-foreground leading-relaxed">{mockProperty.description}</p>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <h2 className="text-xl font-bold mb-4">Особенности</h2>
                <div className="grid grid-cols-2 gap-3">
                  {mockProperty.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border sticky top-24 space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Цена</div>
                <div className="text-3xl font-bold text-gold">{formatPrice(mockProperty.price)}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {formatPrice(Math.round(mockProperty.price / mockProperty.area))} за м²
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">Продавец</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarImage src={mockProperty.owner.avatarUrl} />
                    <AvatarFallback className="gold-gradient text-background font-bold">
                      {mockProperty.owner.firstName.charAt(0)}{mockProperty.owner.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{mockProperty.owner.firstName} {mockProperty.owner.lastName}</div>
                    <div className="text-sm text-muted-foreground">Собственник</div>
                  </div>
                </div>
                <Button className="w-full gold-gradient text-background font-semibold mb-3">
                  <Icon name="Phone" size={18} className="mr-2" />
                  {mockProperty.owner.phone}
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Написать сообщение
                </Button>
              </div>

              <div className="border-t border-border pt-6">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                  <Icon name="Heart" size={18} className="mr-2" />
                  Добавить в избранное
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                  <Icon name="Share2" size={18} className="mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>
          </div>
        </div>
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
