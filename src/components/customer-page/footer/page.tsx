import React from "react";
import { MapPinHouse } from "lucide-react";
import { FooterNavLinks } from "../headers/navlinks";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className=" border-t shadow-sm bg-gray-100/50">
      <div className="max-w-7xl mx-auto py-10 px-4  xl:px-0 flex justify-between items-top gap-10 flex-col md:flex-row">
        <div className="flex-1 md:flex-2/4  ">
          <h3 className="font-semibold">About Web Store</h3>
          <p className="mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, a
            accusamus aliquam vero facere dolore accusantium eligendi adipisci
            dignissimos officiis!
          </p>

        </div>

        <div className="flex-1/4 md:block ">
          <div>
            <h3 className="font-semibold">Menu</h3>
          </div>
          <FooterNavLinks />
        </div>
        <div className="flex-2/4  md:block">
          <h2 className="font-bold text-4xl">Web Store</h2>
          <div className="mt-4">
            <h3 className="font-semibold">Address</h3>
            <p>00/000 Bangrak, Surawong , Bangkok 10600</p>
            <ul className="mt-4">
              <li>Tel: 00-000-0000d</li>
              <li>Email : info@webstore.com</li>
            </ul>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248057.49867579533!2d100.63311079999998!3d13.724599549999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2z4LiB4Lij4Li44LiH4LmA4LiX4Lie4Lih4Lir4Liy4LiZ4LiE4Lij!5e0!3m2!1sth!2sth!4v1763978107463!5m2!1sth!2sth"  loading="lazy" className="w-full h-1/2 mt-4 border"></iframe>
        </div>
      </div>
      <div className=" border-t py-4 bg-white">
        <p className="p-0 text-center">© Copyright {year} Web Store</p>
      </div>
    </footer>
  );
};

export default Footer;
