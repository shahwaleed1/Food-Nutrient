import React, { useEffect } from 'react';
import './imagtextmarquee.css'


const Marquee = () => {
    const data = {
        images: [
            '/dairy_no_cheese.png',
            '/cheese.png',
            '/fruits.png',
            '/vegetables.png',
            '/salads.png',
            '/meats.png',
            '/game_and_fowl.png',
        ],
        texts: [
            'Dairy',
            'Cheese',
            'Fruits',
            'Vegetables',
            'Dishes',
            'Meats',
            'Fast Food',
        ]
    };

    return (
        <div className="marquee-wrapper">
            <div className="marquee-content">
                {data.images.map((img, index) => (
                    <div
                    key={index}
                    className="marquee-item flex items-center justify-center rounded-full border border-gray-300 px-4  mx-3 bg-white hover:bg-slate-50 
                      min-w-0 flex-shrink-0 max-w-[200px] overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={data.texts[index]}
                      className="w-10 h-auto me-2 flex-shrink-0"
                    />
                    <span className="block text-center break-words">
                      {data.texts[index]}
                    </span>
                  </div>                  
                ))}
            </div>
        </div>
    );
}

export default Marquee;
