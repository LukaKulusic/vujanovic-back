"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesObject = exports.UserRolesObject = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles["VIEWER"] = "Viewer";
    UserRoles["TOUR_GUIDE"] = "Tour_Guide";
    UserRoles["COOK"] = "Cook";
    UserRoles["RECEPTIONIST"] = "Receptionist";
    UserRoles["ADMIN"] = "Admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
exports.UserRolesObject = {
    1: {
        id: 1,
        name: UserRoles.ADMIN,
    },
    2: {
        id: 2,
        name: UserRoles.VIEWER,
    },
    3: {
        id: 3,
        name: UserRoles.RECEPTIONIST,
    },
    4: {
        id: 4,
        name: UserRoles.COOK,
    },
    5: {
        id: 5,
        name: UserRoles.TOUR_GUIDE,
    },
};
exports.RolesObject = {
    Admin: {
        id: 1,
        name: UserRoles.ADMIN,
    },
    Viewer: {
        id: 2,
        name: UserRoles.VIEWER,
    },
    Receptionist: {
        id: 3,
        name: UserRoles.RECEPTIONIST,
    },
    Cook: {
        id: 4,
        name: UserRoles.COOK,
    },
    Tour_Guide: {
        id: 5,
        name: UserRoles.TOUR_GUIDE,
    },
};
//# sourceMappingURL=roles.enum.js.map