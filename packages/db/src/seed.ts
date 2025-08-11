import { PrismaClient } from "@prisma/client";
import { Role } from "@gestion-ucl/core";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@ucl.ac.be",
      firstName: "Admin",
      lastName: "User",
      phone: "+32 123 456 789",
      roles: {
        create: {
          role: Role.PRESIDENT,
        },
      },
      memberships: {
        create: {
          status: "ACTIVE",
          startAt: new Date(),
        },
      },
    },
  });

  // Create sample members
  const members = [];
  for (let i = 1; i <= 150; i++) {
    const member = await prisma.user.create({
      data: {
        email: `member${i}@student.ucl.ac.be`,
        firstName: `Member${i}`,
        lastName: `Last${i}`,
        phone: `+32 ${100 + i} 456 789`,
        roles: {
          create: {
            role: Role.MEMBER,
          },
        },
        memberships: {
          create: {
            status: Math.random() > 0.1 ? "ACTIVE" : "PENDING",
            startAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          },
        },
      },
    });
    members.push(member);
  }

  // Create a few special roles
  await prisma.userRole.createMany({
    data: [
      { userId: members[0].id, role: Role.VICE_PRESIDENT },
      { userId: members[1].id, role: Role.TRESORIER },
      { userId: members[2].id, role: Role.SECRETAIRE },
      { userId: members[3].id, role: Role.EVENT_LEAD },
      { userId: members[4].id, role: Role.COMMS_LEAD },
    ],
  });

  // Create sample events
  const event1 = await prisma.event.create({
    data: {
      title: "Welcome Party 2024",
      slug: "welcome-party-2024",
      description: "Join us for the annual welcome party!",
      location: "Student Center, UCL",
      startAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours later
      capacity: 200,
      status: "PUBLISHED",
      ticketTypes: {
        create: [
          {
            name: "Student",
            priceCents: 500, // 5 EUR
            quota: 150,
            memberOnly: true,
          },
          {
            name: "External",
            priceCents: 1000, // 10 EUR
            quota: 50,
            memberOnly: false,
          },
        ],
      },
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: "Study Session - Mathematics",
      slug: "study-session-math",
      description: "Group study session for mathematics exam preparation",
      location: "Library, UCL",
      startAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      endAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
      capacity: 30,
      status: "PUBLISHED",
      ticketTypes: {
        create: [
          {
            name: "Student",
            priceCents: 0, // Free
            quota: 30,
            memberOnly: true,
          },
        ],
      },
    },
  });

  // Create sample tickets
  const ticketTypes = await prisma.ticketType.findMany();
  for (let i = 0; i < 50; i++) {
    const randomUser = members[Math.floor(Math.random() * members.length)];
    const randomTicketType = ticketTypes[Math.floor(Math.random() * ticketTypes.length)];
    
    await prisma.ticket.create({
      data: {
        eventId: randomTicketType.eventId,
        userId: randomUser.id,
        ticketTypeId: randomTicketType.id,
        status: Math.random() > 0.2 ? "PAID" : "RESERVED",
        purchasedAt: Math.random() > 0.2 ? new Date() : null,
        checkedInAt: Math.random() > 0.8 ? new Date() : null,
      },
    });
  }

  // Create sample due campaign
  const due = await prisma.due.create({
    data: {
      season: "2024-2025",
      amountCents: 2000, // 20 EUR
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      description: "Annual membership fee for 2024-2025",
    },
  });

  // Create sample due payments
  for (let i = 0; i < 100; i++) {
    const randomUser = members[Math.floor(Math.random() * members.length)];
    
    await prisma.duePayment.create({
      data: {
        dueId: due.id,
        userId: randomUser.id,
        status: Math.random() > 0.3 ? "PAID" : "PENDING",
      },
    });
  }

  // Create sample announcement
  await prisma.announcement.create({
    data: {
      title: "Welcome to the new academic year!",
      body: "We're excited to start this new academic year with you. Don't forget to pay your membership fees and check out our upcoming events!",
      targets: ["all"],
      sentAt: new Date(),
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`Created ${members.length + 1} users (including admin)`);
  console.log("Created 2 events with ticket types");
  console.log("Created sample tickets and payments");
  console.log("Created membership campaign");
  console.log("Created sample announcement");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });