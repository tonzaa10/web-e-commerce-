import { UserType } from "@/types/user";
import MobileMenu from "./mobile-menu";
import CartIcon from "./cart-icon";

interface NavbarProps {
  user: UserType | null;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="flex items-center gap-3">
      {/* Mobile Navigation */}
      {user && <CartIcon/>}
      <MobileMenu/>

      {/* Desktop Navigation */}
      <div className="hidden">
        <div>Desktop Links</div>
        {user ? <div>Desktop Menu</div> : <div>Go To Signin Button</div>}
      </div>

    </nav>
  );
};

export default Navbar;
