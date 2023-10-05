import { User } from "@/models/userModel";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const validationSchema = [
    {
      valid: validator.isLength(name, { min: 3 }),
      errorMessage: "Name must be at least 3 characters",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Please provide a valid email address",
    },
    {
      valid: validator.isLength(password, { min: 6 }),
      errorMessage: "Password must be at least 6 characters",
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

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  if (!user) {
    return NextResponse.json({ user }, { status: 400 });
  }

  return NextResponse.json(user);
}
