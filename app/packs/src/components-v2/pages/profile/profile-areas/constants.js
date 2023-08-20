import { Goals } from "./goals";
import { Updates } from "./updates";
import { About } from "./about";
import { Support } from "./support";
import { Connections } from "./connections";

export const TAB_TO_AREA_MAP = withUpdatesTab => {
  if (withUpdatesTab) {
    return {
      0: Goals,
      1: Updates,
      2: Connections,
      3: About,
      4: Support
    };
  } else {
    return {
      0: Goals,
      1: Connections,
      2: About,
      3: Support
    };
  }
};

export const TAB_NAME_TO_INDEX_MAP = withUpdatesTab => {
  if (withUpdatesTab) {
    return {
      goals: 0,
      updates: 1,
      connections: 2,
      about: 3,
      support: 4
    };
  } else {
    return {
      goals: 0,
      connections: 1,
      about: 2,
      support: 3
    };
  }
};
