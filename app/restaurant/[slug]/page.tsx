import { NewHongKongComponent } from '@/components/new-hong-kong';
import { GallipoliMenuComponent } from '@/components/gallipoli-menu';
import { NikoNikoRollAndSushi } from '@/components/niko-niko-roll-and-sushi';
import { HotChilisComponent } from '@/components/hot-chilis';

export default function RestaurantPage({ params }: { params: { slug: string } }) {
  switch (params.slug) {
    case 'new-hong-kong':
      return <NewHongKongComponent />;
    case 'gallipoli':
      return <GallipoliMenuComponent />;
    case 'niko-niko-roll-and-sushi':
      return <NikoNikoRollAndSushi />;
    case 'hot-chilis':
      return <HotChilisComponent />;
    default:
      return <div>Restaurant not found</div>;
  }
}