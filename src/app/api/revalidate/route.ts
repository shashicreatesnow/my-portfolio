import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const secret = request.headers.get("x-revalidation-secret") || body.secret;

  if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = body.path || "/";
  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path });
}
