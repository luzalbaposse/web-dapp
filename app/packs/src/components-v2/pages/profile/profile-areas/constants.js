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
      2: About,
      3: Connections,
      4: Support
    };
  } else {
    return {
      0: Goals,
      1: About,
      2: Connections,
      3: Support
    };
  }
};

export const TAB_NAME_TO_INDEX_MAP = withUpdatesTab => {
  if (withUpdatesTab) {
    return {
      goals: 0,
      updates: 1,
      about: 2,
      connections: 3,
      support: 4
    };
  } else {
    return {
      goals: 0,
      about: 1,
      connections: 2,
      support: 3
    };
  }
};
