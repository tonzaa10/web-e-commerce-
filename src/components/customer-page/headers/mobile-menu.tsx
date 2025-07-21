import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import React from 'react'

const MobileMenu = () => {
  return (
    <Button variant="ghost" size='icon'>
      <Menu size={20}/>
    </Button>
  )
}

export default MobileMenu