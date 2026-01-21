import { Panel, StatCard } from "./ui/Card.jsx";
import Pill from "./ui/Pill.jsx";
import { fmt } from "../utils/format.js";

export default function ComparisonPanel({ delta, lightFactor, interpretation, pillLabel }) {
  const hasDelta = delta !== null;

  return (
    <Panel className="lg:col-span-2 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Vergleich</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            ΔEV = EV(B) − EV(A). Positive Werte bedeuten: B ist dunkler (weniger Licht) als A.
          </p>
        </div>
        {pillLabel ? (
          <Pill className="bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
            {pillLabel}
          </Pill>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <StatCard className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">ΔEV (Stops)</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">{hasDelta ? fmt(delta, 2) : "—"}</div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {hasDelta ? "ΔEV in Stops (EV(B) − EV(A))." : "Beide Einstellungen ausfüllen."}
          </div>
        </StatCard>

        <StatCard className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">Lichtfaktor (B vs A)</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">
            {hasDelta ? `${fmt(lightFactor, 3)}×` : "—"}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Faktor = 2^(−ΔEV). 0.5 bedeutet halb so viel Licht.
          </div>
        </StatCard>

        <StatCard className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">Kurzinterpretation</div>
          <div className="mt-1 text-base font-semibold">{interpretation}</div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Bezieht sich auf EV100 (ISO 100).</div>
        </StatCard>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
        <details className="group">
          <summary className="cursor-pointer list-none select-none text-sm font-medium text-slate-900 dark:text-slate-200">
            Formel / Annahmen anzeigen
            <span className="ml-2 text-slate-500 dark:text-slate-400 group-open:hidden">(aufklappen)</span>
            <span className="ml-2 hidden text-slate-500 dark:text-slate-400 group-open:inline">(zuklappen)</span>
          </summary>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="mb-2">
              <span className="font-medium">EV100 = log₂(N² / t)</span>, mit N = Blendenzahl und t = Belichtungszeit in Sekunden.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              ISO-Hinweis: Für ISO S gilt häufig <span className="font-medium">EV(S) = EV100 − log₂(S/100)</span>.
            </p>
          </div>
        </details>
      </div>
    </Panel>
  );
}
