import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
}

export default function AddPropertyModal({ isOpen, onClose, userId }: AddPropertyModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [floor, setFloor] = useState('');
  const [totalFloors, setTotalFloors] = useState('');
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property added:', { title, price, area, propertyType });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold">Добавить объект</DialogTitle>
          <DialogDescription>
            Заполните информацию о вашем объекте недвижимости
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Название объекта *</Label>
              <Input
                id="title"
                placeholder="Элитная квартира с видом на город"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Подробное описание объекта..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="bg-background border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property-type">Тип недвижимости *</Label>
                <Select value={propertyType} onValueChange={setPropertyType} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Квартира</SelectItem>
                    <SelectItem value="penthouse">Пентхаус</SelectItem>
                    <SelectItem value="studio">Студия</SelectItem>
                    <SelectItem value="house">Дом</SelectItem>
                    <SelectItem value="townhouse">Таунхаус</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Цена (₽) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="25000000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="area">Площадь (м²) *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="120"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="rooms">Комнат</Label>
                <Input
                  id="rooms"
                  type="number"
                  placeholder="3"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="floor">Этаж</Label>
                <Input
                  id="floor"
                  type="number"
                  placeholder="5"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="total-floors">Всего этажей</Label>
                <Input
                  id="total-floors"
                  type="number"
                  placeholder="10"
                  value={totalFloors}
                  onChange={(e) => setTotalFloors(e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="address">Адрес *</Label>
                <Input
                  id="address"
                  placeholder="Москва, Пресненская набережная"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">Загрузите фотографии объекта</p>
              <p className="text-sm text-muted-foreground">Перетащите файлы или нажмите для выбора</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="submit" className="flex-1 gold-gradient text-background font-semibold">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить объект
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
