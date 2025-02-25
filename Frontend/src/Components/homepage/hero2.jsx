import React, { useState } from 'react';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Hero2Section() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full p-8 grid place-items-center  h-screen ">
      {/* Background Image with Blur */}
      <div className="absolute w-[70vw] inset-0 bg-cover bg-center blur-md" style={{ backgroundImage: "url('../../assets/abg.jpg')" }}></div>
      
      {/* Content Section */}
      <div className="relative max-w-4xl max-h-3xl bg-gray-700 bg-opacity-75 p-8 border border-yellow-500 rounded-xl shadow-lg text-center">
        <h2 className="text-4xl p-[10px] font-bold text-yellow-400 uppercase md:text-3xl sm:text-2xl xl:text-6xl 2xl:text-6xl">THEME</h2>
        <h3 className="text-xl text-gray-200 mb-4 md:text-lg sm:text-base xl:text-3xl 2xl:text-3xl">ABYUDAYA'25: ENIGMATIC ENSEMBLE</h3>
        <p className="text-gray-300 text-lg leading-relaxed sm:text-sm xl:text-xl 2xl:text-1.5xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa obcaecati molestiae nulla facere quo consequuntur vitae blanditiis.
          <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet alias pariatur accusamus laborum, sapiente modi at blanditiis cum aliquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus culpa excepturi ullam odit ut atque minima! Temporibus eum placeat repudiandae quisquam saepe sequi facere consectetur dicta, similique quod ducimus numquam ratione, aperiam voluptatum maiores earum blanditiis ipsam! Molestias pariatur delectus dignissimos itaque cupiditate facere nisi nobis autem ut perspiciatis illum beatae sit odio, voluptatibus minus eum tempora dicta soluta adipisci, commodi aspernatur, labore eveniet culpa. Tenetur cumque minus, voluptatum, minima cupiditate harum nihil eveniet, architecto optio natus nostrum odit animi modi nam sint consectetur dolorem iusto quidem accusamus. Consequatur quos numquam a officia fugiat? Non reprehenderit accusantium accusamus dolore maxime.
        </p>
      </div>
    </div>
  );
}