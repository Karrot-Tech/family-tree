import { FC } from "react";
import s from "./Footer.module.css";

const Footer: FC = () => (
  <footer className={s.footer}>
    <span className={s.footerItem}>Jai Shri Venkatramana! 🙏✨</span>
    <span className={s.footerItem}>© 2025 Karrot Tech (🥕📡). All rights reserved.</span>
  </footer>
);

export default Footer;
