import Button from "./ui/Button.jsx";
import { Panel, StatCard } from "./ui/Card.jsx";
import { LabeledField, TextInput } from "./ui/Input.jsx";
import Pill from "./ui/Pill.jsx";
import { fmt } from "../utils/format.js";

export default function SettingPanel({
  title,
  description,
  aperturePlaceholder,
  timePlaceholder,
  timeHint,
  apertureValue,
  timeValue,
  onApertureChange,
  onTimeChange,
  onParseClick,
  evValue,
}) {
  const hasValue = evValue !== null;

  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <Pill className="bg-indigo-500/10 text-indigo-700 ring-indigo-500/20 dark:text-indigo-200">EV100</Pill>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <LabeledField label="Blende (f/N)">
          <TextInput
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0.7"
            placeholder={aperturePlaceholder}
            className="mt-2"
            value={apertureValue}
            onChange={(event) => onApertureChange(event.target.value)}
          />
        </LabeledField>

        <LabeledField label="Zeit (Sekunden)" hint={timeHint}>
          <div className="mt-2 flex gap-2">
            <TextInput
              type="number"
              inputMode="decimal"
              step="0.0001"
              min="0.000001"
              placeholder={timePlaceholder}
              value={timeValue}
              onChange={(event) => onTimeChange(event.target.value)}
            />
            <Button className="shrink-0 px-4 py-3" onClick={onParseClick}>
              1/…
            </Button>
          </div>
        </LabeledField>
      </div>

      <StatCard className="mt-5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">Ergebnis</span>
          <Pill
            className={`bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-200 ${
              hasValue ? "" : "hidden"
            }`}
          >
            OK
          </Pill>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">EV100</span>
            <span className="text-xl font-semibold tabular-nums">{hasValue ? fmt(evValue, 2) : "—"}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {hasValue ? "EV100 berechnet aus N² / t." : "Werte eingeben, um EV zu berechnen."}
          </p>
        </div>
      </StatCard>
    </Panel>
  );
}
