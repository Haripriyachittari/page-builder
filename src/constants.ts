export const blocks = [
  {
    key: "label",
    text: "Label",
  },
  {
    key: "input",
    text: "Input",
  },
  {
    key: "button",
    text: "Button",
  },
] as const;
export const blockElements = blocks.map((block) => block.key);
