"use client"

import { useEffect } from "react"

const RELOAD_KEY = "chunk-reload-at"

const isChunkLoadError = (error: Error) =>
  error.name === "ChunkLoadError" || /Loading chunk|Failed to load chunk/i.test(error.message)

const Error = ({ error }: { error: Error & { digest?: string }; unstable_retry: () => void }) => {
  useEffect(() => {
    if (!isChunkLoadError(error)) return

    // A stale page pointing at JS files from an older deploy: reload once to pick up
    // the new build. The timestamp guard stops a reload loop if the chunk is truly missing.
    try {
      const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0)
      if (Date.now() - last > 30_000) {
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
        window.location.reload()
      }
    } catch {
      // sessionStorage unavailable — fall through to the manual Reload button.
    }
  }, [error])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-[#330065] px-5 text-center text-white">
      <h1 className="text-2xl font-semibold">This page couldn&apos;t load</h1>
      <p className="text-sm text-white/70">Reload to try again, or go back.</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-[#5FDA78] px-6 py-2 font-semibold text-[#0F2417] cursor-pointer"
        >
          Reload
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-full border border-white/40 px-6 py-2 cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default Error
