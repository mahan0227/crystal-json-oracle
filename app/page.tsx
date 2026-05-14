"use client";

import { useState } from "react";
import { ApiKeyBar, authHeaders, useOpenAISettings } from "@/components/ApiKeyBar";

export default function Home() {
  const settings = useOpenAISettings();
  const { apiKey, model } = settings;
  const [intent, setIntent] = useState(
    "We ingest IoT telemetry batches. Each batch has device_id (uuid), readings (array of { ts: iso8601, value: number, unit: enum [c,f,pa] }), optional tags map string->string, and a checksum sha256.",
  );
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  async function run() {
    setError("");
    setOutput("");
    if (!apiKey.trim()) {
      setError("Add your OpenAI API key above.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/schema", {
        method: "POST",
        headers: authHeaders(apiKey),
        body: JSON.stringify({ intent, model }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setOutput(JSON.stringify(data.result ?? data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300/90">
          Neuron suite · 07
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Crystal JSON Oracle
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Describe the payload you wish existed — get JSON Schema, happy-path and adversarial
          samples, and migration notes for evolving APIs.
        </p>
      </header>

      <ApiKeyBar settings={settings} accent="from-teal-400 to-cyan-500" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Intent / domain description</span>
            <textarea
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              rows={14}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-teal-400/60"
            />
          </label>
          <button
            type="button"
            disabled={loading}
            onClick={run}
            className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-3 text-sm font-semibold text-teal-950 shadow-lg shadow-teal-500/30 transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Crystallizing…" : "Generate schema pack"}
          </button>
        </div>
        <div className="flex min-h-[520px] flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs md:text-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Schema pack</span>
            {error ? <span className="text-rose-400">Error</span> : null}
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <pre className="flex-1 overflow-auto whitespace-pre-wrap text-zinc-100">{output}</pre>
        </div>
      </div>
    </div>
  );
}
