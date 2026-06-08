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
