import { prisma } from "./client";
import { CreateUserInput, UpdateUserInput, Role } from "@gestion-ucl/core";

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
        memberships: {
          where: { status: "ACTIVE" },
          orderBy: { startAt: "desc" },
          take: 1,
        },
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
        memberships: {
          where: { status: "ACTIVE" },
          orderBy: { startAt: "desc" },
          take: 1,
        },
      },
    });
  }

  async findMany(params?: {
    skip?: number;
    take?: number;
    search?: string;
    isActive?: boolean;
  }) {
    const { skip, take, search, isActive } = params || {};

    return prisma.user.findMany({
      where: {
        ...(isActive !== undefined && { isActive }),
        ...(search && {
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        roles: true,
        memberships: {
          where: { status: "ACTIVE" },
          orderBy: { startAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  async count(params?: { search?: string; isActive?: boolean }) {
    const { search, isActive } = params || {};

    return prisma.user.count({
      where: {
        ...(isActive !== undefined && { isActive }),
        ...(search && {
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
    });
  }

  async create(data: CreateUserInput) {
    return prisma.user.create({
      data: {
        ...data,
        roles: {
          create: {
            role: Role.MEMBER,
          },
        },
        memberships: {
          create: {
            status: "PENDING",
            startAt: new Date(),
          },
        },
      },
      include: {
        roles: true,
        memberships: true,
      },
    });
  }

  async update(id: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        roles: true,
        memberships: {
          where: { status: "ACTIVE" },
          orderBy: { startAt: "desc" },
          take: 1,
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async addRole(userId: string, role: Role, scope?: string) {
    return prisma.userRole.create({
      data: {
        userId,
        role,
        scope,
      },
    });
  }

  async removeRole(userId: string, role: Role, scope?: string) {
    return prisma.userRole.deleteMany({
      where: {
        userId,
        role,
        scope,
      },
    });
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
    });
    return userRoles.map((ur) => ur.role);
  }
}