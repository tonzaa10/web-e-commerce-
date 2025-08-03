import Link from "next/link"
import { ShoppingBag } from "lucide-react"

const CartIcon = () => {
  return (
    <Link href="/cart" className="md:hidden">
      <ShoppingBag size={20}/>
    </Link>
  )
}

export default CartIcon