import Button from "@/components/Button/Button";
import { getTotalFamiliesCount, getNodesCount, getTreeDepth } from "@/components/Widget/utils";
import Widget from "@/components/Widget/Widget";
import ballS from "@/styles/Ball.module.css";
import s from "@/styles/HomePage.module.css";
import f from "@/components/FamilyLink/FamilyLink.module.css";
import FamilyLink from "@/components/FamilyLink/FamilyLink";
import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";
import Link from 'next/link'
import { getFamiliesMap } from "@/data";

const HomePage: NextPage = () => {
  const nodesCount = getNodesCount();
  const treeDepth = getTreeDepth();
  const familiesCount = getTotalFamiliesCount();
  const families = getFamiliesMap();

  return (
    <div className={s.pageContainer}>
      <div className={s.content}>
        <div className={s.descriptionContainer1}>
          <div className={classNames(s.titleContainer, s.descriptionItem)}>
            <div className={s.logoContainer}>
              <Image src="/LogoBig.png" width={120} height={110} alt="Family Tree" />
            </div>
            <span className={s.logoTitle}>Family Tree</span>
          </div>
        </div>
        <div className={s.descriptionContainer}>
          <span className={classNames(s.description, s.descriptionItem)}>
          This is a digital record of Vasudaiva Kutumbakam of Konkani speaking Gaud Saraswat Brahmin&apos;s.
          </span>
          <span className={classNames(s.description, s.descriptionItem)}>
            This open group project provides family tree of GSB community which traces its origins to the migration of Saraswat Brahmins from the region of Gaud (modern-day Bengal and Bihar) to the Konkan region of India. 
          </span>
          <span className={classNames(s.description, s.descriptionItem)}>
            This 🌳 also provides relationship of individuals from GSB family with other families.
          </span>
          <span className={classNames(s.description, s.descriptionItem)}>
            If you have any information or materials and would like to contribute to the project, please contact us on WhatsApp.
          </span>
          <div className={s.buttonsContainer}>
            <Button href="/families" text="👉 Trace your Family 🧑‍🧑‍🧒‍🧒" className={s.descriptionItem} />
            <Button
              href="https://wa.me/+12242292932?text=Hello%21%20I%E2%80%99m%20writing%20regarding%20the%20DHANI%20project"
              text="📲 on WhatsApp"
              className={s.descriptionItem}
              isSecondary={true}
              newTab={true}
            />
          </div>
        </div>
        <div className={s.descriptionContainer2}>
          <div className={classNames(s.titleContainer, s.descriptionItem)}>
            {/* <div className={s.logoContainer}>
              <Image src="/LogoBig.png" width={120} height={110} alt="Family Tree" />
            </div> */}
            <span className={s.logoSubTitle}>Prominent Roots</span>
          </div>
          <div className={s.rootFamilyLinks}>
            <FamilyLink key={118} href={`/tree?root=118`} familyName={"Vedamurthi Subbaiah Bhat, with 11 generations"} />
          </div>
          <div className={s.rootFamilyLinks}>
            <FamilyLink key={1} href={`/tree?root=1`} familyName={"Ankola Venkatesh (Venku) Pai, with 7 generations"} />
          </div>
        </div>
        <div className={s.widgets}>
          <Widget title="Total number of people in the tree" value={nodesCount.toString()} />
          {/* <Widget title="Number of generations in the tree" value={treeDepth.toString()} /> */}
          <Widget title="Number of root families in the tree" value={familiesCount.toString()} />
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
