import { notFound } from 'next/navigation'
import restaurants from '@/data/restaurants.json'
import { GallipoliMenuComponent } from '@/components/gallipoli-menu'
import { NewHongKongComponent } from '@/components/new-hong-kong'
import { NikoNikoRollAndSushi } from '@/components/niko-niko-roll-and-sushi'

export default function RestaurantPage({ params }: { params: { slug: string } }) {
  const restaurant = restaurants.find(r => r.slug === params.slug)

  if (!restaurant) {
    notFound()
  }

  const getRestaurantComponent = (slug: string) => {
    switch (slug) {
      case 'gallipoli-restaurant':
        return <GallipoliMenuComponent />
      case 'new-hong-kong':
        return <NewHongKongComponent />
      case 'niko-niko-roll-and-sushi':
        return <NikoNikoRollAndSushi />
      default:
        return notFound()
    }
  }

  // Ensure the component is rendered only after the restaurant is found
  const restaurantComponent = restaurant ? getRestaurantComponent(restaurant.slug) : null;

  return (
    <div>
      {restaurantComponent || <p>Loading...</p>} {/* Fallback loading state */}
    </div>
  )
}

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    slug: restaurant.slug,
  }))
}