"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesObject = exports.ProgramTypeObject = exports.ProgramType = void 0;
var ProgramType;
(function (ProgramType) {
    ProgramType["BEFORE_NOON"] = "Before_Noon";
    ProgramType["AFTERNOON"] = "Afternoon";
})(ProgramType = exports.ProgramType || (exports.ProgramType = {}));
exports.ProgramTypeObject = {
    1: {
        id: 1,
        name: ProgramType.BEFORE_NOON,
    },
    2: {
        id: 2,
        name: ProgramType.AFTERNOON,
    },
};
exports.TypesObject = {
    Before_Noon: {
        id: 1,
        name: ProgramType.BEFORE_NOON,
    },
    Afternoon: {
        id: 2,
        name: ProgramType.AFTERNOON,
    },
};
//# sourceMappingURL=program.enum.js.map