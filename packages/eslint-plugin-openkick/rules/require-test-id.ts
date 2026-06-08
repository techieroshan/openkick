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
