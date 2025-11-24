import React from 'react'
import { DesktopNavLinks } from '../headers/ืnavlinks'

const Footer = () => {
  return (
    <footer className=' bg-card border-t shadow-sm'>
            <div className='container mx-auto px-4 xl:px-0 flex justify-between items-center h-16 gap-6'>
                <div className="flex-1 md:flex-2/4 ">
                    <h3 className='font-semibold'>Address</h3>
                </div>
                <div className="flex-2/4 text-right hidden md:block"><DesktopNavLinks/></div>
            </div>
        </footer>
  )
}

export default Footer