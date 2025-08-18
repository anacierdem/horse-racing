export type Horse = {
  // TODO: theoretically, we could use a template literal type of actual names
  name: string;
  // TODO: use a proper string union instead
  color: string;
  condition: number;
};

export type Round = {
  horses: Horse[];
  length: number;
};
