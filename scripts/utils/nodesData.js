const { omitKeys } = require("./common.js");
const { getNodesWithFamilies, getNodesWithFamiliesTopDown } = require("./families.js");

const getNodesData = (transformedNodes, relationsMap) => {
  const nodes = transformedNodes.map((node) =>
    omitKeys(node, ["motherId", "fatherId", "stepMotherId", "stepFatherId", "spouseId"])
  );

  return getNodesWithFamilies(nodes, relationsMap);
};

const getNodesDataTopDown = (transformedNodes, relationsMap, rootFamilies) => {
  const nodes = transformedNodes.map((node) =>
    omitKeys(node, ["motherId", "fatherId", "stepMotherId", "stepFatherId", "spouseId"])
  );

  return getNodesWithFamiliesTopDown(nodes, relationsMap);
};

module.exports = {
  getNodesData,
  getNodesDataTopDown,
};
