import { getTreeNodesMap } from "@/data";
import { RelationInfo, TreeNodeDataWithRelations } from "@/types/tree";
import { Relation } from "@/lib/relatives-tree/types";

const nodesMap = getTreeNodesMap();
const MONTHS: Record<number, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const getMonthString = (month: number, day?: number) => {
  const monthName = MONTHS[month];
  return monthName ?? "";
};

export const getDate = (year?: number, month?: number, day?: number) => {
  if (!year) return undefined;
  if (!month || !MONTHS[month]) return `${year}`;

  return year
    ? month
      ? day
        ? `${day} ${getMonthString(month)} ${year}`
        : `${getMonthString(month)} ${year}`
      : `${year}`
    : undefined;
};

const getTreeNodeRelationDetails = (relations: readonly Relation[]): RelationInfo[] => {
  return relations.flatMap((relation) => {
    const relationNode = nodesMap[relation.id];
    if (!relationNode) return [];

    return [{
      id: relation.id,
      fullName: relationNode.data.fullName,
      type: relation.type,
      firstName: relationNode.data.firstName,
    }];
  });
};

export const getTreeNodeDetails = (selectedNodeId?: string): TreeNodeDataWithRelations | undefined => {
  if (selectedNodeId === undefined) {
    return;
  }

  const selectedNode = nodesMap[selectedNodeId];
  if (!selectedNode) return undefined;

  const parents = getTreeNodeRelationDetails(selectedNode.parents);
  const children = getTreeNodeRelationDetails(selectedNode.children);
  const spouses = getTreeNodeRelationDetails(selectedNode.spouses);
  const siblings = getTreeNodeRelationDetails(selectedNode.siblings);

  return {
    ...selectedNode.data,
    parents,
    children,
    spouses,
    siblings,
  };
};
