Title: ESLint Custom Rules and Config for Test ID and Traceability

Overview
This package adds two custom rules
* require test id on interactive elements
* enforce Openkick test id format with user story and acceptance criteria tags when applicable

Install
* Place files under packages slash eslint plugin openkick
* Publish locally or reference via workspace
* Add config to the root eslint config

Files

packages slash eslint plugin openkick slash index dot ts
```ts
import { Linter } from "eslint";
import requireTestId from "./rules/require-test-id";
import enforceTestIdFormat from "./rules/enforce-test-id-format";

export const rules: Record<string, Linter.RuleModule> = {
  "require-test-id": requireTestId,
  "enforce-test-id-format": enforceTestIdFormat,
};
export default { rules };

packages slash eslint plugin openkick slash rules slash require dash test dash id dot ts

import { Rule } from "eslint";

const INTERACTIVE_ROLES = new Set([
  "button",
  "link",
  "textbox",
  "combobox",
  "menuitem",
  "checkbox",
  "radio",
  "switch",
  "tab",
  "slider",
]);

function getJSXAttr(node: any, name: string) {
  return node.openingElement.attributes.find(
    (a: any) => a.type === "JSXAttribute" && a.name && a.name.name === name
  );
}

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "require data-testid on interactive elements",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          allowList: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missing:
        "Interactive element is missing data-testid. Add data-testid following Openkick naming policy.",
    },
  },
  create(context) {
    const allowList: string[] =
      (context.options[0] && context.options[0].allowList) || [];

    return {
      JSXOpeningElement(node: any) {
        const name = node.name && node.name.name;
        if (!name) return;

        const roleAttr = getJSXAttr({ openingElement: node }, "role");
        const roleValue =
          roleAttr &&
          roleAttr.value &&
          (roleAttr.value.expression
            ? null
            : (roleAttr.value.value as string));

        const isInteractiveRole = roleValue
          ? INTERACTIVE_ROLES.has(roleValue)
          : false;

        const intrinsicInteractive =
          name === "button" ||
          name === "a" ||
          name === "input" ||
          name === "select" ||
          name === "textarea";

        if (!(isInteractiveRole || intrinsicInteractive)) return;

        const hasTestId = !!getJSXAttr({ openingElement: node }, "data-testid");
        if (hasTestId) return;

        const classNameAttr = getJSXAttr({ openingElement: node }, "className");
        const className =
          classNameAttr &&
          classNameAttr.value &&
          !classNameAttr.value.expression &&
          (classNameAttr.value.value as string);

        if (className && allowList.some((x) => className.includes(x))) return;

        context.report({ node, messageId: "missing" });
      },
    };
  },
};

export default rule;

packages slash eslint plugin openkick slash rules slash enforce dash test dash id dash format dot ts

import { Rule } from "eslint";

const TESTID_REGEX =
  /^ok:[a-z0-9]+:[a-z0-9-]+:[a-z0-9-]+(?::US-[0-9]{3}(?::AC-[0-9]{3}-[0-9]+)?)?$/;

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "enforce Openkick data-testid format and optional US and AC suffix",
      recommended: false,
    },
    schema: [],
    messages: {
      format:
        "data-testid must match ok:area:component:purpose[:US-xxx[:AC-xxx-y]]. Received {{val}}",
    },
  },
  create(context) {
    return {
      JSXAttribute(node: any) {
        if (!node.name || node.name.name !== "data-testid") return;
        const valNode = node.value;
        if (!valNode) return;
        let value: string | null = null;
        if (valNode.type === "Literal") value = String(valNode.value);
        if (
          valNode.type === "JSXExpressionContainer" &&
          valNode.expression.type === "Literal"
        ) {
          value = String(valNode.expression.value);
        }
        if (!value) return;
        if (!TESTID_REGEX.test(value)) {
          context.report({
            node: valNode,
            messageId: "format",
            data: { val: value },
          });
        }
      },
    };
  },
};

export default rule;
Root eslint config example dot eslintrc dot cjs for Vite React

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "openkick"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  settings: {
    react: { version: "detect" }
  },
  rules: {
    "openkick/require-test-id": "warn",
    "openkick/enforce-test-id-format": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
};