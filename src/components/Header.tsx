import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface HeaderProps {
  user: User | null;
  onAuthClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  onAddPropertyClick: () => void;
}

export default function Header({ user, onAuthClick, onProfileClick, onLogout, onAddPropertyClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
            <Icon name="Building2" size={24} className="text-background" />
          </div>
          <span className="text-2xl font-bold text-gold">Движ.Ок</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-foreground hover:text-primary transition-colors">Каталог</a>
          <a href="/map" className="text-foreground hover:text-primary transition-colors">Карта</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">О нас</a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button onClick={onAddPropertyClick} className="gold-gradient text-background font-semibold">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить объект
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
                        <Icon name="User" size={16} className="text-background" />
                      </div>
                    )}
                    <span className="hidden md:block">{user.firstName || user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={onProfileClick}>
                    <Icon name="User" size={16} className="mr-2" />
                    Личный кабинет
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="Building2" size={16} className="mr-2" />
                    Мои объекты
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={onAuthClick} className="gold-gradient text-background font-semibold">
              Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}