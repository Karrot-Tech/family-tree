const { getTransformedNodesFromInputCsv } = require("./utils/transformInput.js");
const { writeToJson } = require("./utils/common.js");
const { getNodesData, getNodesDataTopDown } = require("./utils/nodesData.js");
const { getRelations } = require("./utils/relations.js");
const { getAllFamilies, getRootFamilies } = require("./utils/families.js");

const PATH_TO_INPUT_CSV = "Family Tree Knots - People.csv";

const parseTree = async () => {
  const inputTreeNodes = await getTransformedNodesFromInputCsv(PATH_TO_INPUT_CSV);
  const { relations, relationsMap } = getRelations(inputTreeNodes);
  const nodesData = getNodesData(inputTreeNodes, relationsMap);

  const families = getAllFamilies(nodesData);
  const rootFamilies = getRootFamilies(nodesData);

  const nodesDataTopDown = getNodesDataTopDown(inputTreeNodes, relationsMap, rootFamilies);

  writeToJson(nodesData, "nodes");
  writeToJson(relations, "relations");
  writeToJson({ families, rootFamilies }, "meta");
};

parseTree();
