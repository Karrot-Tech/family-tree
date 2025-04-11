import Credit from "@/components/Credit/Credit";
import ballS from "@/styles/Ball.module.css";
import s from "@/styles/CreditsPage.module.css";
import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";

const credits = [
  { name: "Pavan Pai", description: "for painstakingly collecting information" },
  { name: "Pavan Pai", description: "for website development" },
  {
    name: "Pavan Pai",
    description: "for structuring information for the site",
  },
];

const CreditsPage: NextPage = () => {
  return (
    <div className={s.pageContainer}>
      <div className={s.content}>
        <div className={s.descriptionContainer}>
          <div className={classNames(s.titleContainer, s.descriptionItem)}>
            <div className={s.logoContainer}>
              <Image src="/LogoBig.png" width={120} height={110} alt="Logo of the Dhani Tree" />
            </div>
            <span className={s.logoTitle}>Acknowledgements</span>
          </div>
          {credits.map((item, index) => (
            <Credit key={index} name={item.name} description={item.description} />
          ))}
        </div>
      </div>
      <div className={s.imageContainer}>
        <div className={ballS.ball1} />
        <div className={ballS.ball2} />
        <div className={ballS.ball3} />
        <div className={ballS.ball4} />
        <div className={ballS.ball5} />
      </div>
    </div>
  );
};

export default CreditsPage;
