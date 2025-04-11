import { useNodeSelectionContext } from "@/context/tree";
import { CloseIcon } from "@/icons/CloseIcon";
import { FC, useState } from "react";
import BioLink from "./BioLink/BioLink";
import BioNavItem from "./BioNavItem/BioNavItem";
import s from "./TreeNodeDetails.module.css";
import { TreeNodeDetailsBio } from "./TreeNodeDetailsBio/TreeNodeDetailsBio";
import { TreeNodeFamilies } from "./TreeNodeFamilies/TreeNodeFamilies";
import { getTreeNodeDetails } from "./utils";

const navigation = [
  { id: 1, title: "Biography" },
  { id: 2, title: "Gallery" },
  { id: 3, title: "Families" },
];

const TreeNodeDetails: FC = () => {
  const { hasSubTree, selectedNodeId, unselectNode, selectNode } = useNodeSelectionContext();
  const [selectedNavId, setSelectedNavId] = useState<number>(1);
  const nodeDetails = getTreeNodeDetails(selectedNodeId);

  if (!nodeDetails) return null;

  const tabContent =
    selectedNavId === 1 ? (
      <TreeNodeDetailsBio {...nodeDetails} onRelationNodeClick={(id) => selectNode(id)} />
    ) : selectedNavId === 2 ? (
      <>
        <span className={s.rootItem}>Unfortunately, we dont have any photos of this person yet.</span>
        <span className={s.rootItem}>
          If you want to help and have photos you want to add to the gallery, please,{" "}
          <BioLink
            href="https://wa.me/+12242292932?text=Hello%21%20I%20am%20writing%20regarding%20the%20Dhani%20Tree%20project"
            text="Contact us on WhatsApp"
            newTab={true}
          />
          .
        </span>
      </>
    ) : (
      <TreeNodeFamilies {...nodeDetails} />
    );

  return (
    <div className={s.root}>
      <button className={s.closeButton} onClick={unselectNode}>
        <CloseIcon className={s.closeIcon} />
      </button>
      <div className={s.rootItem}>
        <h2 className={s.name}>{nodeDetails.fullName}</h2>
        {hasSubTree && (
          <span className={s.hasSubTreeNote}>
            Not all ancestors are visible in the tree. <br /> You can see it on the Families tab,
            <wbr /> from whom does it come? {nodeDetails.firstName}.
          </span>
        )}
      </div>
      <nav className={s.rootItem}>
        {navigation.map((item, index) => (
          <BioNavItem
            key={index}
            id={item.id}
            text={item.title}
            isSelected={item.id === selectedNavId}
            onClick={setSelectedNavId}
          />
        ))}
      </nav>
      {tabContent}
    </div>
  );
};

export default TreeNodeDetails;
