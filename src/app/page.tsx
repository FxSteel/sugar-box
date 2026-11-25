import { Faq } from "@/components/sections/faq"
import { HeroBento } from "@/components/sections/hero-bento"
import { HowToOrder } from "@/components/sections/how-to-order"
import { MenuGrid } from "@/components/sections/menu-grid"
import { OccasionsTabs } from "@/components/sections/occasions-tabs"
import { PhotoMarquee } from "@/components/sections/photo-marquee"
import { SeasonPromo } from "@/components/sections/season-promo"
import { StoryScroll } from "@/components/sections/story-scroll"

export default function Home() {
  return (
    <>
      <HeroBento />
      <PhotoMarquee />
      <StoryScroll />
      <MenuGrid />
      <OccasionsTabs />
      <SeasonPromo />
      <HowToOrder />
      <Faq />
    </>
  )
}
