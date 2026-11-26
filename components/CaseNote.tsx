import Image from "next/image";
import { business } from "@/content/business";

/**
 * Real job story from the owner. Until one exists for this service,
 * a visible {{CASE_NOTE}} placeholder renders. Never write an invented story here.
 */
export function CaseNote({ service }: { service: string }) {
  const note = business.caseNotes.find((n) => n.service === service);
  if (!note) {
    return (
      <aside className="my-10 rounded border-2 border-dashed border-alu bg-white/60 p-5" aria-label="Job story placeholder">
        <p className="config-label">CASE NOTE</p>
        <p className="mt-2 font-mono text-sm text-frame-soft">
          {"{{CASE_NOTE}}"}: a real job story with before and after photos from the owner goes here.
        </p>
      </aside>
    );
  }
  return (
    <aside className="panel my-10 p-5 sm:p-6" aria-label="Job story">
      <p className="config-label">CASE NOTE &middot; {note.location}</p>
      <h3 className="mt-2 text-xl">{note.title}</h3>
      <p className="mt-2">{note.story}</p>
      {(note.beforeImage || note.afterImage) && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {note.beforeImage && (
            <figure>
              <Image src={note.beforeImage} alt={`Before: ${note.title}`} width={600} height={450} className="rounded" />
              <figcaption className="text-sm">Before</figcaption>
            </figure>
          )}
          {note.afterImage && (
            <figure>
              <Image src={note.afterImage} alt={`After: ${note.title}`} width={600} height={450} className="rounded" />
              <figcaption className="text-sm">After</figcaption>
            </figure>
          )}
        </div>
      )}
    </aside>
  );
}
