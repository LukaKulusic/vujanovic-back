export enum ProgramType {
  "BEFORE_NOON" = "Before_Noon",
  "AFTERNOON" = "Afternoon",
}

export const ProgramTypeObject = {
  1: {
    id: 1,
    name: ProgramType.BEFORE_NOON,
  },
  2: {
    id: 2,
    name: ProgramType.AFTERNOON,
  },
};

export const TypesObject = {
  Before_Noon: {
    id: 1,
    name: ProgramType.BEFORE_NOON,
  },
  Afternoon: {
    id: 2,
    name: ProgramType.AFTERNOON,
  },
};
