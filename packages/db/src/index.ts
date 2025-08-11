export { prisma } from "./client";
export { UserRepository } from "./repositories/user";
export { EventRepository } from "./repositories/event";

// Re-export Prisma types
export type { User, Event, Ticket, Payment } from "@prisma/client";