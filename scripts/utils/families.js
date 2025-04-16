const _ = require("lodash");

const getParents = (rel, relationsMap) => {
  return relationsMap.get(rel.id)?.ancestors ?? [];
};

const getChildren = (rel, relationsMap) => {
  return relationsMap.get(rel.id)?.children ?? [];
};

const getFamilyNode = (rel, relationsMap) => {
  const node = relationsMap.get(rel.id);
  // const firstName = node?.firstName ?? "";
  // const patronym = node?.patronym ?? "";
  // return [firstName, patronym].join(" ");
  return node;
};

const getTopDownFamilies = (node, relationsMap) => {
  const families = [];

  const children = getChildren(node, relationsMap);
  
  if (children.length === 0) {
    return families;
  }

  const queue = [...children];

  while (queue.length > 0) {
    const children = queue.shift();
    const childrensChildren = getChildren(children, relationsMap);

    const parentNode = getFamilyNode(children, relationsMap);
    const lastName = parentNode?.lastName ?? "";
    const firstName = parentNode?.firstName ?? "";
    const patronym = parentNode?.patronym ?? "";
    if (childrensChildren.length >= 0) {
      families.push({
        id: children.id,
        lastName: lastName,
        firstName: firstName,
        patronym: patronym,
      });
    } else {
      queue.push(...childrensChildren);
    }
  }

  return families;
};

const getFamilies = (node, relationsMap, families) => {
  const parents = getParents(node, relationsMap);
  
  if (parents.length === 0) {
    return families;
  }

  const queue = [...parents];
  while (queue.length > 0) {
    const parent = queue.shift();
    const parentParents = getParents(parent, relationsMap);
    let queue1 = [];

    const parentNode = getFamilyNode(parent, relationsMap);
    const lastName = parentNode?.lastName ?? "";
    const firstName = parentNode?.firstName ?? "";
    const patronym = parentNode?.patronym ?? "";
    if (parentParents.length > 0) {
      families.push({
        id: parent.id,
        lastName: lastName,
        firstName: firstName,
        patronym: patronym,
        root: false,
        end: false
      });
      queue1.push(parent);
    } else if (parentParents.length === 0) {
      families.push({
        id: parent.id,
        lastName: lastName,
        firstName: firstName,
        patronym: patronym,
        root: true,
        end: false
      });
      queue1.push(parent);
    }
    
          
    const children = getChildren(node, relationsMap);
    if (children.length === 0) {
      const selfNode = getFamilyNode(node, relationsMap);
      families.push({
        id: selfNode.id,
        lastName: selfNode.lastName,
        firstName: selfNode.firstName,
        patronym: selfNode.patronym,
        root: false,
        end: true
      });
    }

    while (queue1.length > 0) {
      const parent1 = queue1.shift();
      const parent1Node = getFamilyNode(parent1, relationsMap);
      getFamilies(parent1Node, relationsMap, families)
    } 
  }

  return families;
};

const getNodesWithFamilies = (nodes, relationsMap) => {
  return nodes.map((node) => {
    const familiesAry = [];
    const families = getFamilies(node, relationsMap, familiesAry);
    // const families = getTopDownFamilies(node, relationsMap);

    return {
      ...node,
      families,
      isFamilyRoot: families.length === 0,
    };
  });
};

const getNodesWithFamiliesTopDown = (nodes, relationsMap) => {
  return nodes.map((node) => {
    const families = getTopDownFamilies(node, relationsMap);
    
    return {
      ...node,
      families,
      isFamilyBottom: families.length === 0,
    };
  });
};

const getAllFamilies = (nodesData) => {
  return _.uniqBy(
    nodesData.flatMap((n) => n.families),
    (f) => f.id
  ).filter((f) => !f.root).sort((a, b) => a.lastName.localeCompare(b.lastName));
};

const getRootFamilies = (nodesData) => {
  return _.uniqBy(
    nodesData.flatMap((n) => n.families),
    (f) => f.id
  ).filter((f) => f.root).sort((a, b) => a.lastName.localeCompare(b.lastName));
};

module.exports = {
  getNodesWithFamilies,
  getNodesWithFamiliesTopDown,
  getAllFamilies,
  getRootFamilies,
};
