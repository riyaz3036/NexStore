"use client"
import React from 'react';
import Link from 'next/link';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; 
import Image from 'next/image';
import Button from '../Button/Button';
import home_offers from '../../assets/home_offers.jpg';
import home_discover from '../../assets/home_discover.jpg';
import home_toppicks from '../../assets/home_toppicks.jpg';

export default function FeatureCards() {

  const cards = [
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

  const items = cards.map((card, index) => (
    <div key={index} className="relative w-full h-[500px]">
      <Image src={card.image} alt={card.title} className="h-full w-full object-cover" />
      <div className="absolute top-0 h-full flex flex-col justify-center w-full text-center">
        <p className="text-5xl font-semibold mb-2">{card.title}</p>
        <p className="text-base mb-40 px-24">{card.subtitle}</p>
        <div className="flex justify-center">
          <Link href="/Products/all"><Button text="SHOP NOW" theme="normal" /></Link>
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
