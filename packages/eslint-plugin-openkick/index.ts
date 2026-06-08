import { Linter } from "eslint";
import requireTestId from "./rules/require-test-id";
import enforceTestIdFormat from "./rules/enforce-test-id-format";

export const rules: Record<string, Linter.RuleModule> = {
  "require-test-id": requireTestId,
  "enforce-test-id-format": enforceTestIdFormat,
};

export default { rules };
