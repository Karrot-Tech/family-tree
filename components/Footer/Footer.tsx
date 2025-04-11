import { FC } from "react";
import s from "./Footer.module.css";

const Footer: FC = () => (
  <footer className={s.footer}>
    <span className={s.footerItem}>Jai Shri Venkatramana! 🙏✨</span>
    <span className={s.footerItem}>© 2025 <a hreh=\"https://karrot.tech/\">Karrot Tech (🥕📡)</a>. All rights reserved.</span>
  </footer>
);

export default Footer;
