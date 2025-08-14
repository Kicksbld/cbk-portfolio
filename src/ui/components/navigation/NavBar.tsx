"use client";

import { Links } from "@/ui/design-system/Links";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import { TbMenu3 } from "react-icons/tb";
import Car from "./Car";
import Link from "next/link";
import { useNavContext } from "../../../../context/NavContext";
import SwitchLanguages from "../SwitchLanguages";
import { useTranslations } from "use-intl"; // Import de la fonction de traduction

const NavBar = () => {
  const { navVisibility, setNavVisibility } = useNavContext();
  const t = useTranslations(); // Récupère les traductions

  return (
    <nav className="lg:pt-[47px] pt-[20px] fixed z-50 container mx-auto top-0  w-full backdrop-blur-md">
      <div className="flex items-center w-full justify-between lg:py-[25px] py-[10px] border-y border-y-primary">
       {/*  <div
          className="w-full lg:hidden block"
          onClick={() => setNavVisibility(!navVisibility)}
        >
          <TbMenu3 size={35} color="#1c1b29" />
        </div> */}

        <Link href="/" className="lg:w-full flex items-center">
          <Image
            alt="logo"
            src="/img/svg/cbkLogo.svg"
            width={110}
            height={48}
            className="max-w-max"
          />
        </Link>
        <ul className=" items-center gap-[60px] w-fit lg:flex hidden">
          <Links link="#header" className="w-max" variant="normal">
            {t("navbar.home")}
          </Links>
          <Links link="#aboutme" className="w-max" variant="normal">
            {t("navbar.aboutMe")}
          </Links>
          <Links link="#myskills" className="w-max" variant="normal">
            {t("navbar.mySkills")}
          </Links>
          <Links link="#mywork" className="w-max" variant="normal">
            {t("navbar.myWork")}
          </Links>
          <Links link="#form" className="w-max" variant="normal">
            {t("navbar.contact")}
          </Links>
        </ul>
        <div className="flex items-center gap-[35px] w-full justify-end">
          <div 
            className="items-center gap-2 lg:flex hidden cursor-pointer" 
            onClick={() => window.open('/api/download?file=cv.pdf', '_blank')}
          >
            {t("navbar.resume")}
            <HiOutlineExternalLink size={18} />
          </div>
          <SwitchLanguages />
        </div>
      </div>
      <Car />
    </nav>
  );
};

export default NavBar;
