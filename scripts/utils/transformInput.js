const csvToJson = require("csvtojson");
const { filterValues } = require("./common.js");
const path = require("path");

const TransformKeyMap = {
  id: "id",
  lastname: "lastName",
  name: "firstName",
  surname: "patronym",
  gender: "gender",
  mother: "motherId",
  father: "fatherId",
  stepmother: "stepMotherId",
  stepfather: "stepFatherId",
  spouses: "spouseId",
  "Wedding year": "weddingYear",
  "Wedding month": "weddingMonth",
  "Wedding day": "weddingDay",
  "Year of birth": "birthYear",
  "Month of birth": "birthMonth",
  "Birthday": "birthDay",
  "City of birth": "birthPlace",
  "Year of death": "deathYear",
  "Month of death": "deathMonth",
  "Day of death": "deathDay",
  "City of death": "deathPlace",
  Nationality: "nationality",
  Education: "education",
  Profession: "occupation",
  Awards: "rewards",
  Biography: "bio",
};

const getOutKey = (key) => {
  for (const [inKey, outKey] of Object.entries(TransformKeyMap)) {
    if (new RegExp(inKey, "i").test(key)) return outKey;
  }
};

const getGender = (str) => (str === "m" ? "male" : "female");

const getTransformedNodesFromInputCsv = async (pathToInputCsv) => {
  const inputTreeNodes = await csvToJson().fromFile(
    path.join(__dirname, "../input", pathToInputCsv)
  );

  const inputTreeNodesWithDefinedValues = inputTreeNodes.map((node) =>
    filterValues(node, "")
  );

  return inputTreeNodesWithDefinedValues
    .map((node) => {
      return Object.fromEntries(
        Object.entries(node).map(([key, value]) => {
          const outKey = getOutKey(key);
          if (outKey === "gender") {
            value = getGender(value);
          } else if (
            [
              "birthYear",
              "birthMonth",
              "birthDay",
              "deathYear",
              "deathMonth",
              "deathDay",
            ].includes(outKey)
          ) {
            value = Number(value);
          }

          return [outKey, value];
        })
      );
    })
    .filter(({ firstName }) => firstName !== undefined)
    .sort((a, b) => a.birthYear - b.birthYear);
};

module.exports = {
  getTransformedNodesFromInputCsv,
};
