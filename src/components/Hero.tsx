import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/4ed4a55e-970c-413e-aa2a-5a141835f027/files/74bf1291-3c49-4785-9cff-aabfd6f54030.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
          Премиальная недвижимость
          <br />
          <span className="text-gold gold-glow">вашей мечты</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Эксклюзивные объекты в лучших локациях города. Найдите идеальное пространство для жизни и инвестиций.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" onClick={onGetStarted} className="gold-gradient text-background font-semibold text-lg px-8 py-6 gold-glow">
            <Icon name="Search" size={20} className="mr-2" />
            Начать поиск
          </Button>
          <a href="/map">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6">
              <Icon name="Map" size={20} className="mr-2" />
              Открыть карту
            </Button>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">500+</div>
            <div className="text-muted-foreground">Объектов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">1000+</div>
            <div className="text-muted-foreground">Клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">15+</div>
            <div className="text-muted-foreground">Лет опыта</div>
          </div>
        </div>
      </div>
    </section>
  );
}