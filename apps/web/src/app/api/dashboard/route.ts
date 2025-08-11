import { NextRequest, NextResponse } from "next/server";
import { UserRepository, EventRepository } from "@gestion-ucl/db";

const userRepo = new UserRepository();
const eventRepo = new EventRepository();

export async function GET(request: NextRequest) {
  try {
    const [
      totalMembers,
      activeMembers,
      upcomingEvents,
      todayCheckIns,
    ] = await Promise.all([
      userRepo.count(),
      userRepo.count({ isActive: true }),
      eventRepo.getUpcomingEvents(5),
      eventRepo.getTodayCheckIns(),
    ]);

    const membershipRate = totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0;

    const stats = {
      activeMembers,
      totalMembers,
      membershipRate,
      upcomingEvents: upcomingEvents.length,
      todayCheckIns,
      // Mock data for revenue and pending payments - would be calculated from actual payment data
      totalRevenue: 2840,
      pendingPayments: 15,
    };

    return NextResponse.json({
      stats,
      upcomingEvents: upcomingEvents.map(event => ({
        id: event.id,
        title: event.title,
        startAt: event.startAt,
        location: event.location,
        ticketsSold: event._count?.tickets || 0,
        capacity: event.capacity,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}