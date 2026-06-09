const requireTestId = require("./rules/require-test-id");
const enforceTestIdFormat = require("./rules/enforce-test-id-format");

module.exports = {
  rules: {
    "require-test-id": requireTestId,
    "enforce-test-id-format": enforceTestIdFormat,
  },
};
