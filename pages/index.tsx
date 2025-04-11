import Button from "@/components/Button/Button";
import { getFamiliesCount, getNodesCount, getTreeDepth } from "@/components/Widget/utils";
import Widget from "@/components/Widget/Widget";
import ballS from "@/styles/Ball.module.css";
import s from "@/styles/HomePage.module.css";
import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";

const HomePage: NextPage = () => {
  const nodesCount = getNodesCount();
  const treeDepth = getTreeDepth();
  const familiesCount = getFamiliesCount();

  return (
    <div className={s.pageContainer}>
      <div className={s.content}>
        <div className={s.descriptionContainer}>
          <div className={classNames(s.logoContainer, s.descriptionItem)}>
            <Image src="/LogoBig.png" width={120} height={110} alt="The Tree Project" />
            <span className={s.logoTitle}>👨‍👩‍👧‍👦 Family Tree 🌳</span>
          </div>
          <span className={classNames(s.description, s.descriptionItem)}>
            Dhani is an open group project to restore genealogical connections and collect information about the origins of the Karkala Konkani family and their relationship with other families.
          </span>
          <span className={classNames(s.description, s.descriptionItem)}>
            The result of extensive detective-style archival research by many individuals is a large-scale genealogical tree that traces its roots back to the 19th century.
          </span>
          <span className={classNames(s.description, s.descriptionItem)}>
            If you have any information or materials and would like to contribute to the project, please contact us on WhatsApp.
          </span>
          <div className={s.buttonsContainer}>
            <Button href="/tree" text="👉 View the tree 🌳" className={s.descriptionItem} />
            <Button
              href="https://wa.me/+12242292932?text=Hello%21%20I%E2%80%99m%20writing%20regarding%20the%20DHANI%20project"
              text="📲 on WhatsApp"
              className={s.descriptionItem}
              isSecondary={true}
              newTab={true}
            />
          </div>
        </div>
        <div className={s.widgets}>
          <Widget title="Total number of people in the tree" value={nodesCount.toString()} />
          <Widget title="Number of generations in the tree" value={treeDepth.toString()} />
          <Widget title="Number of distinct families in the tree" value={familiesCount.toString()} />
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

export default HomePage;
