import { NextRequest, NextResponse } from "next/server";
import { EventRepository } from "@gestion-ucl/db";
import { createEventSchema } from "@gestion-ucl/core";

const eventRepo = new EventRepository();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") as any;

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      eventRepo.findMany({ skip, take: limit, search, status }),
      eventRepo.count({ search, status }),
    ]);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createEventSchema.parse(body);

    const event = await eventRepo.create(validatedData);

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}