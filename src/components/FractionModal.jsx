import Button from "./ui/Button.jsx";
import { Panel } from "./ui/Card.jsx";
import { LabeledField, TextInput } from "./ui/Input.jsx";

export default function FractionModal({ open, value, error, onChange, onClose, onApply }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className={`fixed inset-0 ${open ? "flex" : "hidden"} items-center justify-center bg-black/60 p-4`}
      onClick={handleOverlayClick}
    >
      <Panel as="div" className="w-full max-w-md p-5 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Zeit eingeben (Bruch)</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Beispiel: <span className="font-medium">1/100</span> oder <span className="font-medium">0.01</span>
            </p>
          </div>
          <Button className="px-3 py-2" onClick={onClose}>
            Schließen
          </Button>
        </div>

        <div className="mt-4">
          <LabeledField label="Zeit">
            <TextInput
              type="text"
              placeholder="z. B. 1/25"
              className="mt-2"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onApply();
                }
                if (event.key === "Escape") onClose();
              }}
            />
          </LabeledField>
          {error ? <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button className="px-4 py-3" variant="ghost" onClick={onClose}>
            Abbrechen
          </Button>
          <Button className="px-4 py-3 font-semibold" variant="primary" onClick={onApply}>
            Übernehmen
          </Button>
        </div>
      </Panel>
    </div>
  );
}
