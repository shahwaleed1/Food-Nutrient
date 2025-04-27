import React from 'react'
import './marquee.css'

const Navbar = () => {
    return (
        <div>
            <div className=' container py-2 sticky top-0 flex'>
                <div className=' text-lg font-bold w-[10rem] text-slate-800 '> Food Nutrient </div>
                <div className='marquee'>
                    <div className='marquee-content-nav'>Check Food <span className='text-amber-500'>Recipe</span>  and <span className='text-lime-500'> Nutrient </span></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar