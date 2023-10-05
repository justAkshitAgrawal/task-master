import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Task } from "@/models/taskModel";
import validator from "validator";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const userTasks = await Task.find({ userId: userId });
  return NextResponse.json(userTasks);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();

  const validationSchema = [
    {
      valid: validator.isLength(title, { min: 3 }),
      errorMessage: "Title must be at least 3 characters",
    },
    {
      valid: validator.isLength(description, { min: 6 }),
      errorMessage: "Description must be at least 6 characters",
    },
  ];

  const validationErrors: any = [];

  validationSchema.forEach((item) => {
    if (!item.valid) {
      validationErrors.push(item.errorMessage);
    }
  });

  if (validationErrors.length > 0) {
    return NextResponse.json({ error: validationErrors[0] }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const newTask = await Task.create({
    title,
    description,
    userId,
  });

  return NextResponse.json(newTask);
}

export async function PUT(req: Request) {
  const { _id, title, description } = await req.json();

  const validationSchema = [
    {
      valid: validator.isLength(title, { min: 3 }),
      errorMessage: "Title must be at least 3 characters",
    },
    {
      valid: validator.isLength(description, { min: 6 }),
      errorMessage: "Description must be at least 6 characters",
    },
  ];

  const validationErrors: any = [];

  validationSchema.forEach((item) => {
    if (!item.valid) {
      validationErrors.push(item.errorMessage);
    }
  });

  if (validationErrors.length > 0) {
    return NextResponse.json({ error: validationErrors[0] }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updatedTask = await Task.findByIdAndUpdate(
    _id,
    {
      title,
      description,
    },
    { new: true }
  );

  return NextResponse.json(updatedTask);
}

export async function DELETE(req: Request) {
  const { taskId } = await req.json();

  if (!taskId) {
    return NextResponse.json({ error: "Task id is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await Task.findByIdAndDelete(taskId);

  if (!res) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted" });
}
