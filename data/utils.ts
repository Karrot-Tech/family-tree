import { TreeNode, TreeNodeDataFromJson } from "@/types/tree";
import { Gender, Node as RelNode } from "@/lib/relatives-tree/types";
import nodesData from "./nodes.json";
import nodesRelations from "./relations.json";
import families from "./meta.json";
import { Family } from "@/types/family";

type RawTreeNodeData = TreeNodeDataFromJson & {
  gender?: string;
  families?: Family[];
};

type NodeRelations = Pick<RelNode, "id" | "parents" | "siblings" | "spouses" | "children">;

export const readNodesFromJson = (): TreeNode[] => {
  const typedNodesData = nodesData as RawTreeNodeData[];
  const typedNodesRelations = nodesRelations as NodeRelations[];
  const nodeDataMap = Object.fromEntries(typedNodesData.map((nodeData) => [nodeData.id, nodeData]));
  const treeNodes: TreeNode[] = typedNodesRelations.map((node) => {
    const data = nodeDataMap[node.id];
    if (!data) {
      throw new Error(`Node data not found for id=${node.id}`);
    }

    const gender = data.gender === Gender.female ? Gender.female : Gender.male;

    return {
      ...node,
      gender,
      data: {
        ...data,
        fullName: getFullName(data),
        families: [...(data.families ?? [])].sort((a, b) => {
          if (a.lastName > b.lastName) {
            return 1;
          }
          if (a.lastName < b.lastName) {
            return -1;
          }
          return 0;
        }),
      },
    };
  });

  return treeNodes;
};

export const readFamilies = (): Family[] => {
  return families.families.map((family) => ({
    id: family.id,
    lastName: family.lastName,
    firstName: family.firstName,
    patronym: family.patronym,
  }));
};

// export const readRootFamilies = (): Family[] => {
//   return families.rootFamilies.map((family) => ({ id: family.id, lastName: family.lastName, firstName : family.firstName, patronym: family.patronym, root: family.root}));
// };

const getFullName = ({ firstName, lastName, patronym }: TreeNodeDataFromJson): string => {
  const full = [];

  if (lastName) full.push(lastName);
  if (firstName) full.push(firstName);
  if (patronym) full.push(patronym);

  return full.join(" ");
};
