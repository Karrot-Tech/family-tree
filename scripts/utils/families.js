const _ = require("lodash");

const getParents = (rel, relationsMap) => {
  let temp = relationsMap.get(rel.id)?.ancestors;
  return relationsMap.get(rel.id)?.ancestors ?? [];
};

const getFamilyLastName = (rel, relationsMap) => {
  const node = relationsMap.get(rel.id);
  const firstName = node?.firstName ?? "";
  const patronym = node?.patronym ?? "";
  return [firstName, patronym].join(" ");
};

const getFamilies = (node, relationsMap) => {
  const families = [];

  const parents = getParents(node, relationsMap);
  
  if (parents.length === 0) {
    return families;
  }

  const queue = [...parents];

  while (queue.length > 0) {
    const parent = queue.shift();
    const parentParents = getParents(parent, relationsMap);

    if (parentParents.length >= 0) {
      families.push({
        id: parent.id,
        lastName: getFamilyLastName(parent, relationsMap),
      });
    } else {
      queue.push(...parentParents);
    }
  }

  return families;
};

const getNodesWithFamilies = (nodes, relationsMap) => {
  return nodes.map((node) => {
    const families = getFamilies(node, relationsMap);

    return {
      ...node,
      families,
      isFamilyRoot: families.length === 0,
    };
  });
};

const getAllFamilies = (nodesData) => {
  return _.uniqBy(
    nodesData.flatMap((n) => n.families),
    (f) => f.id
  ).sort((a, b) => a.lastName.localeCompare(b.lastName));
};

module.exports = {
  getNodesWithFamilies,
  getAllFamilies,
};
