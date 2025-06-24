"use client"
import React from 'react';
import Link from 'next/link';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; 
import Image, { StaticImageData } from 'next/image';
import home_offers from '../../assets/home_offers.jpg';
import home_discover from '../../assets/home_discover.jpg';
import home_toppicks from '../../assets/home_toppicks.jpg';
import Button from '../common/Button/Button';
import { ButtonTypeEnum } from '@/enums/button-type.enum';
import ColorConstants from '@/constants/ColorConstants';
import RouteConstants from '@/constants/RouteConstants';

interface CardProps {
  image: StaticImageData,
  title: string,
  subtitle: string
}

const cards: CardProps[] = [
  {
    image: home_discover,
    title: "Discover New Horizons",
    subtitle: "Explore our latest collection and discover new horizons with our unique range of products.",
  },
  {
    image: home_offers,
    title: "Exclusive Offers",
    subtitle: "Take advantage of our exclusive offers and enjoy significant savings on your favorite items.",
  },
  {
    image: home_toppicks,
    title: "Top Picks for You",
    subtitle: "Check out our top picks, curated just for you, and find the best products in the market.",
  }
];


const FeatureCards = () => {

  const items = cards.map((card, index) => (
    <div key={index} className="relative w-full h-[500px]">
      <Image src={card.image} alt={card.title} className="h-full w-full object-cover" />
      <div className="absolute top-0 h-full flex flex-col justify-center w-full text-center" style={{color: ColorConstants.black}}>
        <p className="text-5xl font-semibold pb-2">{card.title}</p>
        <p className="text-base px-24">{card.subtitle}</p>
        <div className="flex justify-center mt-40">
          <Link href={RouteConstants.products}><Button text="SHOP NOW" theme={ButtonTypeEnum.NORMAL} /></Link>
        </div>
      </div>
    </div>
  ));

  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval={3000}
      infinite
      disableButtonsControls
    />
  );
}


export default FeatureCards;