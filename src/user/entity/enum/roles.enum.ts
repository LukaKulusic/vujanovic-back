export enum UserRoles {
  'VIEWER' = 'Viewer',
  'TOUR_GUIDE' = 'Tour_Guide',
  'COOK' = 'Cook',
  'RECEPTIONIST' = 'Receptionist',
  'ADMIN' = 'Admin',
}

export const UserRolesObject = {
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
export const RolesObject = {
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
