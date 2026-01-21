import Button from "./ui/Button.jsx";
import { Panel, StatCard } from "./ui/Card.jsx";
import { LabeledField, TextInput } from "./ui/Input.jsx";

export default function ApertureHelper({
  apStep,
  apInput,
  series,
  apPrev,
  apNext,
  onStepChange,
  onInputChange,
  onSetPrevA,
  onSetPrevB,
  onSetNextA,
  onSetNextB,
}) {
  return (
    <Panel className="mb-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Blendenreihe & Navigator</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Gib eine Blende ein. Es werden die nächstkleinere und nächstgrößere Blende aus der Reihe angezeigt.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <span className="text-slate-600 dark:text-slate-300">Schritt</span>
            <select
              id="apStep"
              value={apStep}
              onChange={(event) => onStepChange(event.target.value)}
              className="rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-950/40 dark:ring-slate-800"
            >
              <option value="full">Vollstopp</option>
              <option value="third">1/3 Stop</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <LabeledField
          label="Blende eingeben (f/N)"
          hint="Es wird auf den nächsten Wert der gewählten Reihe gerundet."
        >
          <TextInput
            id="apInput"
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0.7"
            placeholder="z. B. 2.8"
            className="mt-2"
            value={apInput}
            onChange={(event) => onInputChange(event.target.value)}
          />
        </LabeledField>

        <StatCard className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">Vorherige Blende</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">{apPrev ? `f/${apPrev}` : "—"}</div>
          <div className="mt-3 flex gap-2">
            <Button className="w-full px-3 py-2" onClick={onSetPrevA}>
              Setze A
            </Button>
            <Button className="w-full px-3 py-2" onClick={onSetPrevB}>
              Setze B
            </Button>
          </div>
        </StatCard>

        <StatCard className="p-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">Nächste Blende</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">{apNext ? `f/${apNext}` : "—"}</div>
          <div className="mt-3 flex gap-2">
            <Button className="w-full px-3 py-2" onClick={onSetNextA}>
              Setze A
            </Button>
            <Button className="w-full px-3 py-2" onClick={onSetNextB}>
              Setze B
            </Button>
          </div>
        </StatCard>
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-200">Blendenreihe</div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {series.map((value) => `f/${value}`).join(" · ")}
        </p>
      </div>
    </Panel>
  );
}
