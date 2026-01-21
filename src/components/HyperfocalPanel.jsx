import { Panel, StatCard } from "./ui/Card.jsx";
import { LabeledField, TextInput } from "./ui/Input.jsx";
import { fmt } from "../utils/format.js";

const formatRoundedDistance = (mm) => {
  if (!Number.isFinite(mm)) return "—";
  if (mm >= 1_000_000) return `${Math.round(mm / 1_000_000)} km`;
  if (mm >= 1_000) return `${Math.round(mm / 1_000)} m`;
  if (mm >= 10) return `${Math.round(mm / 10)} cm`;
  return `${Math.round(mm)} mm`;
};

export default function HyperfocalPanel({ fValue, kValue, zValue, onFChange, onKChange, onZChange, distance }) {
  const hasValue = distance !== null;
  const halfDistance = hasValue ? distance / 2 : null;

  return (
    <Panel className="lg:col-span-2 p-6">
      <div>
        <h2 className="text-lg font-semibold">Hyperfokaldistanz</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Berechnung nach d(h) = f² / (k · Z) + f. Werte in Millimetern eingeben.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <LabeledField label="Brennweite f (mm)">
          <TextInput
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            placeholder="z. B. 50"
            className="mt-2"
            value={fValue}
            onChange={(event) => onFChange(event.target.value)}
          />
        </LabeledField>

        <LabeledField label="Blendenzahl k (f/N)">
          <TextInput
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            placeholder="z. B. 8"
            className="mt-2"
            value={kValue}
            onChange={(event) => onKChange(event.target.value)}
          />
        </LabeledField>

        <LabeledField label="Zerstreuungskreis Z (mm)">
          <TextInput
            type="number"
            inputMode="decimal"
            step="0.001"
            min="0"
            placeholder="z. B. 0.03"
            className="mt-2"
            value={zValue}
            onChange={(event) => onZChange(event.target.value)}
          />
        </LabeledField>
      </div>

      <StatCard className="mt-5 p-4">
        <div className="text-sm text-slate-600 dark:text-slate-300">Hyperfokaldistanz</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Exakt</div>
            <div className="text-2xl font-semibold tabular-nums">
              {hasValue ? `${fmt(distance, 2)} mm` : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Gerundet</div>
            <div className="text-2xl font-semibold tabular-nums">
              {hasValue ? formatRoundedDistance(distance) : "—"}
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {hasValue ? "Hyperfokaldistanz berechnet." : "Alle Werte eingeben, um die Distanz zu berechnen."}
        </p>
      </StatCard>

      <StatCard className="mt-4 p-4">
        <div className="text-sm text-slate-600 dark:text-slate-300">Ab dieser Distanz wirkt alles scharf</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Exakt</div>
            <div className="text-2xl font-semibold tabular-nums">
              {hasValue ? `${fmt(halfDistance, 2)} mm` : "—"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Gerundet</div>
            <div className="text-2xl font-semibold tabular-nums">
              {hasValue ? formatRoundedDistance(halfDistance) : "—"}
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {hasValue ? "Das ist die halbe Hyperfokaldistanz." : "—"}
        </p>
      </StatCard>
    </Panel>
  );
}
