import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { upload } from "@vercel/blob/client";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  let blob;

  // ⚠️ The below code is for App Router Route Handlers only
  if (filename && request.body) {
    blob = await put(filename, request.body, {
      access: "public",
    });
  } else {
    throw new Error("Filename is null");
  }

  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });
  return NextResponse.json(blob);
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
