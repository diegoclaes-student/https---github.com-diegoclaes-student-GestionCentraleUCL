import { z } from "zod";

// Enums
export const Role = {
  PRESIDENT: "PRESIDENT",
  VICE_PRESIDENT: "VICE_PRESIDENT", 
  TRESORIER: "TRESORIER",
  SECRETAIRE: "SECRETAIRE",
  EVENT_LEAD: "EVENT_LEAD",
  COMMS_LEAD: "COMMS_LEAD",
  MEMBER: "MEMBER"
} as const;

export type Role = typeof Role[keyof typeof Role];

export const MembershipStatus = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING", 
  INACTIVE: "INACTIVE"
} as const;

export type MembershipStatus = typeof MembershipStatus[keyof typeof MembershipStatus];

export const EventStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  CLOSED: "CLOSED"
} as const;

export type EventStatus = typeof EventStatus[keyof typeof EventStatus];

export const EventVisibility = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE"
} as const;

export type EventVisibility = typeof EventVisibility[keyof typeof EventVisibility];

export const TicketStatus = {
  RESERVED: "RESERVED",
  PAID: "PAID",
  CHECKED_IN: "CHECKED_IN",
  REFUNDED: "REFUNDED"
} as const;

export type TicketStatus = typeof TicketStatus[keyof typeof TicketStatus];

export const PaymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED"
} as const;

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

export const PaymentProvider = {
  STRIPE: "STRIPE"
} as const;

export type PaymentProvider = typeof PaymentProvider[keyof typeof PaymentProvider];

// Zod schemas for validation
export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const createEventSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  location: z.string().min(1).max(200),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  capacity: z.number().int().positive().optional(),
  status: z.nativeEnum(EventStatus).default(EventStatus.DRAFT),
  visibility: z.nativeEnum(EventVisibility).default(EventVisibility.PUBLIC),
});

export const updateEventSchema = createEventSchema.partial();

export const createTicketTypeSchema = z.object({
  name: z.string().min(1).max(100),
  priceCents: z.number().int().min(0),
  quota: z.number().int().positive().optional(),
  memberOnly: z.boolean().default(false),
});

export const createAnnouncementSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1),
  targets: z.array(z.string()).optional(),
});

export const createDueSchema = z.object({
  season: z.string().min(1).max(20),
  amountCents: z.number().int().positive(),
  dueDate: z.string().datetime(),
  description: z.string().optional(),
});

// Types
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type CreateTicketTypeInput = z.infer<typeof createTicketTypeSchema>;
export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type CreateDueInput = z.infer<typeof createDueSchema>;