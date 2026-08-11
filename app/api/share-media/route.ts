import https from "https"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

const extraAllowedHosts = new Set([
  "localhost",
  "127.0.0.1",
  "adminapis.shagundirect.com",
  "www.shagundirect.somee.com",
  "shagundirect.somee.com",
])

const getAllowedHosts = () => {
  const hosts = new Set(extraAllowedHosts)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (apiUrl) {
    try {
      hosts.add(new URL(apiUrl).hostname)
    } catch {
      // ignore invalid API URL
    }
  }
  return hosts
}

const insecureHttpsAgent = new https.Agent({ rejectUnauthorized: false })

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url")
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(rawUrl)
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 })
  }

  if (!["http:", "https:"].includes(target.protocol)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 400 })
  }

  if (!getAllowedHosts().has(target.hostname)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 400 })
  }

  try {
    const response = await axios.get<ArrayBuffer>(target.toString(), {
      responseType: "arraybuffer",
      timeout: 60000,
      httpsAgent:
        process.env.NODE_ENV !== "production" ? insecureHttpsAgent : undefined,
      validateStatus: () => true,
    })

    if (response.status < 200 || response.status >= 300) {
      return NextResponse.json({ error: "Fetch failed" }, { status: response.status })
    }

    const contentType =
      String(response.headers["content-type"] || "") || "application/octet-stream"

    return new NextResponse(Buffer.from(response.data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=120",
      },
    })
  } catch {
    return NextResponse.json({ error: "Proxy failed" }, { status: 502 })
  }
}
