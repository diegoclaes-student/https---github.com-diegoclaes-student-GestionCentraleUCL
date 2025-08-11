import { Role } from "./types";

export type Permission = 
  | "users:read"
  | "users:write"
  | "users:delete"
  | "events:read" 
  | "events:write"
  | "events:delete"
  | "events:checkin"
  | "tickets:read"
  | "tickets:write"
  | "payments:read"
  | "payments:write"
  | "dues:read"
  | "dues:write"
  | "announcements:read"
  | "announcements:write"
  | "roles:read"
  | "roles:write"
  | "settings:read"
  | "settings:write";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.PRESIDENT]: [
    "users:read", "users:write", "users:delete",
    "events:read", "events:write", "events:delete", "events:checkin",
    "tickets:read", "tickets:write",
    "payments:read", "payments:write", 
    "dues:read", "dues:write",
    "announcements:read", "announcements:write",
    "roles:read", "roles:write",
    "settings:read", "settings:write"
  ],
  [Role.VICE_PRESIDENT]: [
    "users:read", "users:write",
    "events:read", "events:write", "events:delete", "events:checkin",
    "tickets:read", "tickets:write",
    "payments:read", "payments:write",
    "dues:read", "dues:write", 
    "announcements:read", "announcements:write",
    "roles:read"
  ],
  [Role.TRESORIER]: [
    "users:read",
    "events:read", "events:checkin",
    "tickets:read",
    "payments:read", "payments:write",
    "dues:read", "dues:write"
  ],
  [Role.SECRETAIRE]: [
    "users:read", "users:write",
    "events:read", "events:write", "events:checkin",
    "tickets:read",
    "announcements:read", "announcements:write"
  ],
  [Role.EVENT_LEAD]: [
    "users:read",
    "events:read", "events:write", "events:checkin",
    "tickets:read", "tickets:write"
  ],
  [Role.COMMS_LEAD]: [
    "users:read",
    "events:read",
    "announcements:read", "announcements:write"
  ],
  [Role.MEMBER]: [
    "events:read",
    "tickets:read"
  ]
};

export function hasPermission(userRoles: Role[], permission: Permission): boolean {
  return userRoles.some(role => 
    ROLE_PERMISSIONS[role].includes(permission)
  );
}

export function canReadUsers(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "users:read");
}

export function canWriteUsers(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "users:write");
}

export function canDeleteUsers(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "users:delete");
}

export function canReadEvents(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "events:read");
}

export function canWriteEvents(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "events:write");
}

export function canDeleteEvents(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "events:delete");
}

export function canCheckinEvents(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "events:checkin");
}

export function canReadTickets(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "tickets:read");
}

export function canWriteTickets(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "tickets:write");
}

export function canReadPayments(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "payments:read");
}

export function canWritePayments(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "payments:write");
}

export function canReadDues(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "dues:read");
}

export function canWriteDues(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "dues:write");
}

export function canReadAnnouncements(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "announcements:read");
}

export function canWriteAnnouncements(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "announcements:write");
}

export function canReadRoles(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "roles:read");
}

export function canWriteRoles(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "roles:write");
}

export function canReadSettings(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "settings:read");
}

export function canWriteSettings(userRoles: Role[]): boolean {
  return hasPermission(userRoles, "settings:write");
}