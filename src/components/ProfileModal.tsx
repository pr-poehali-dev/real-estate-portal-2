import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUser: (user: User) => void;
}

export default function ProfileModal({ isOpen, onClose, user, onUpdateUser }: ProfileModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setMiddleName(user.middleName || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onUpdateUser({
        ...user,
        firstName,
        lastName,
        middleName,
        phone,
      });
      onClose();
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold">Личный кабинет</DialogTitle>
          <DialogDescription>
            Управляйте своим профилем и объектами недвижимости
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="gold-gradient text-background text-2xl font-bold">
                {firstName?.charAt(0)}{lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Icon name="Upload" size={18} className="mr-2" />
                Изменить фото
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="lastname">Фамилия</Label>
                <Input
                  id="lastname"
                  placeholder="Петров"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="firstname">Имя</Label>
                <Input
                  id="firstname"
                  placeholder="Иван"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="middlename">Отчество</Label>
                <Input
                  id="middlename"
                  placeholder="Иванович"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (900) 000-00-00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="bg-muted border-border"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 gold-gradient text-background font-semibold">
                Сохранить изменения
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
            </div>
          </form>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Мои объекты</h3>
            <div className="text-muted-foreground text-sm">
              У вас пока нет добавленных объектов
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
