import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Sparkle } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
    return (
        <div className='relative w-full overflow-hidden'>

            {/* Background Elements */}
            <div className='absolute inset-0 bg-gradient-to-br from-muted-foreground via-muted to-primary/80 opacity-25' />

            <div className='container max-auto relative px-4 py-16 md:py-24 lg:py-32'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 ietms-center'>
                    {/* Left content */}
                    <div className='max-w-xl'>
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-primary/60'>
                            <Sparkle size={14} />
                            <span>ยินดีต้อนรับสู่เว็บไซต์ Store</span>
                        </div>
                        <h1 className='text-4xl md:text-6xl font-bold'>
                            ซ็อปสินค้าไอที
                            <span className='block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>ราคาคุ้มค่า</span>
                        </h1>
                        <p className='mt-6 text-lg text-muted-foreground'>ร้านค้าออนไลน์อันดับ 1 สำหรับสินค้าไอทีครบวงจร พร้อมบริการ จัดส่งเร็วและราคาที่คุ้มค่า</p>
                        <div className='mt-8 flex flex-col sm:flex-row gap-4'>
                            <Button className='group shadow-lg shadow-primary/20' asChild>
                                <Link href='/products'>
                                    <ShoppingBag size={20} />
                                    <span>ซ็อปเลย</span>
                                    <ArrowRight size={16} className='opacity-70 transition-transform group-hover:translate-x-1' />
                                </Link>
                            </Button>
                            <Button variant='outline' className='border-primary/30 hover:border-primary/5 transition-colors' asChild>
                                <Link href='/about'>เกี่ยวกับเรา</Link>
                            </Button>
                        </div>
                    </div>
                    {/* Right Content */}
                </div>
            </div>

        </div>
    )
}

export default Hero