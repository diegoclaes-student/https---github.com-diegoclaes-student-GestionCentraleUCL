import { prisma } from "../client";
import { CreateEventInput, UpdateEventInput, EventStatus } from "@gestion-ucl/core";

export class EventRepository {
  async findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
      include: {
        ticketTypes: true,
        tickets: {
          include: {
            user: true,
            ticketType: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.event.findUnique({
      where: { slug },
      include: {
        ticketTypes: true,
        tickets: {
          include: {
            user: true,
            ticketType: true,
          },
        },
      },
    });
  }

  async findMany(params?: {
    skip?: number;
    take?: number;
    status?: EventStatus;
    search?: string;
  }) {
    const { skip, take, status, search } = params || {};

    return prisma.event.findMany({
      where: {
        ...(status && { status }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        ticketTypes: true,
        _count: {
          select: {
            tickets: true,
          },
        },
      },
      orderBy: { startAt: "desc" },
      skip,
      take,
    });
  }

  async count(params?: { status?: EventStatus; search?: string }) {
    const { status, search } = params || {};

    return prisma.event.count({
      where: {
        ...(status && { status }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
    });
  }

  async create(data: CreateEventInput) {
    return prisma.event.create({
      data: {
        ...data,
        startAt: new Date(data.startAt),
        endAt: new Date(data.endAt),
      },
      include: {
        ticketTypes: true,
      },
    });
  }

  async update(id: string, data: UpdateEventInput) {
    return prisma.event.update({
      where: { id },
      data: {
        ...data,
        ...(data.startAt && { startAt: new Date(data.startAt) }),
        ...(data.endAt && { endAt: new Date(data.endAt) }),
      },
      include: {
        ticketTypes: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.event.delete({
      where: { id },
    });
  }

  async getUpcomingEvents(limit = 5) {
    return prisma.event.findMany({
      where: {
        startAt: { gte: new Date() },
        status: "PUBLISHED",
      },
      include: {
        ticketTypes: true,
        _count: {
          select: {
            tickets: { where: { status: "PAID" } },
          },
        },
      },
      orderBy: { startAt: "asc" },
      take: limit,
    });
  }

  async getTodayCheckIns() {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    return prisma.ticket.count({
      where: {
        checkedInAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }
}