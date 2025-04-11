import Image from "next/image";
import s from "@/styles/Faq.module.css";
import ballS from "@/styles/Ball.module.css";
import classNames from "classnames";
import type { NextPage } from "next";
import BioLink from "@/components/Tree/TreeNodeDetails/BioLink/BioLink";
import FaqQuestion from "@/components/FaqQuestion/FaqQuestion";
import personCard from "../public/personCard.png";
import personCard2 from "../public/personCard2.png";
import tree from "../public/tree.png";
import yellowCircle from "../public/yellowCircle.png";

const questions = [
  {
    question: "If I am in the tree, will information about me be available in Google or other search engines?",
    answer: (
      <span>
        No, the tree is not indexed, so no one will find this site by entering your full name in the search bar. But if you are worried about your data being in the tree,{" "}
        <BioLink
          href="https://wa.me/+12242292932?text=Hello%21%20I%20am%20writing%20regarding%20the%20Dhani%20Tree%20project"
          text="Contact us on WhatsApp"
          newTab={true}
        />{" "}
        - we will remove you from the tree or reduce the information to a comfortable minimum.
      </span>
    ),
  },
  {
    question: "I want to add/delete/correct information. How do I do this?",
    answer: (
      <BioLink
        href="https://wa.me/+12242292932?text=Hello%21%20I%20am%20writing%20regarding%20the%20Dhani%20Tree%20project"
        text="Contact us on WhatsApp"
        newTab={true}
      />
    ),
  },
  {
    question: "What families already have information about them in the project?",
    answer: (
      <span>
        На <BioLink href="/families" text="Family page" newTab={true} /> a complete list of families available at the moment is presented. 
        Each family name in this list is a link that you can follow to view the tree of this family. 
        Some trees are large, some are still small. If you suddenly want to help us and add to the tree,{" "}
        <BioLink
          href="https://wa.me/+12242292932?text=Hello%21%20I%20am%20writing%20regarding%20the%20Dhani%20Tree%20project"
          text="Contact us on WhatsApp"
          newTab={true}
        />
        .
      </span>
    ),
  },
  {
    question: "What do I see on the Tree page?",
    answer: (
      <span>
        At <BioLink href="/tree" text="Tree page" newTab={true} /> you can see information about the representatives of a particular family and the type of tree. 
        The tree consists of nodes in the form of balls, each node is a separate person. 
        The tree is built from top to bottom, that is, the older generations are located above. 
        Children are located from left to right - from the eldest to the youngest.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={tree} layout="responsive" />
        </div>
        <br />
        By default, the Karkala Pai family tree is shown, but you can also see trees for other families.{" "}
        <BioLink href="/families" text="Family page" newTab={true} />you can see a list of links to trees of other families. 
        And on the card with detailed information about a person there is a Family tab with a list of those families of which this person is a descendant.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={personCard2} layout="responsive" />
        </div>
      </span>
    ),
  },
  {
    question: "What can I find out about a specific person? Where can I see it?",
    answer: (
      <span>
        At <BioLink href="/tree" text="Tree page" newTab={true} /> you can see the family tree. The tree consists of nodes in the form of balls. 
        Each ball displays the person&apos;s full name and years of life, if we know them.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={tree} layout="responsive" />
        </div>
        <br />
        Also, by clicking on the ball, a card with detailed information about the person opens, where you can see 3 tabs: 
        Biography, Gallery and Families.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={personCard} layout="responsive" />
        </div>
        <br />
        The Biography tab may contain information about a person’s date and place of birth, date and place of death, and close relatives (parents, spouses, children, brothers and sisters). 
        You can also find information about the person’s nationality, education, profession, awards, and a brief biography. 
        Unfortunately, we do not have such information for all individuals in the tree, so if you would like to help and add something, please write to us on WhatsApp.
        <br />
        <br />
        On the Gallery tab you can see photos of this person.
        <br />
        <br />
        On the Families tab you can see a list of families that this person is a descendant of. Each family name there is a link to the tree of this family.
      </span>
    ),
  },
  {
    question: "Why do some balloons have a yellow ring?",
    answer: (
      <span>
        This is how we mark people whose parents are not shown in the tree being viewed. 
        We deliberately do not show everyone in one tree, because such a tree is not only difficult to build, but also difficult to read…
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={yellowCircle} layout="responsive" />
        </div>
        <br />
        But you can open the card of a person with such a ball, go to the Families tab and see which families he is a descendant of. Each surname there is a link to the tree of this family.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={personCard2} layout="responsive" />
        </div>
      </span>
    ),
  },
  {
    question: "Can I share a link to a specific tree?",
    answer: (
      <span>
        Of course! By default, the Karkala Pai family tree always opens, but if you open another family tree and copy the link from the browser line, this link will always lead to this tree.
      </span>
    ),
  },
];

const FaqPage: NextPage = () => (
  <div className={s.pageContainer}>
    <div className={s.content}>
      <div className={s.descriptionContainer}>
        <div className={classNames(s.titleContainer, s.descriptionItem)}>
          <div className={s.logoContainer}>
            <Image src="/LogoBig.png" width={120} height={110} alt="Логотип проекта древо" />
          </div>
          <span className={s.logoTitle}>FAQ</span>
        </div>
        <div className={classNames(s.subtitleContainer, s.descriptionItem)}>
          <span>
            Didnt find the answer to your question?{" "}
            <BioLink
              href="https://wa.me/+12242292932?text=Hello%21%20I%20am%20writing%20regarding%20the%20Dhani%20-%20Tree%20project"
              text="Contact us on WhatsApp"
              newTab={true}
            />{" "}
            We will be happy to help and receive valuable feedback to make the site more convenient and understandable.
          </span>
        </div>
      </div>
      <div className={s.questionsContainer}>
        {questions.map((item, index) => (
          <FaqQuestion key={index} question={item.question} answer={item.answer} isCollapsedByDefault={index > 0} />
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

export default FaqPage;
