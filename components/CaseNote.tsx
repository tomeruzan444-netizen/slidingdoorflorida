import Image from "next/image";
import { business } from "@/content/business";

/**
 * Real job story from the owner. Renders nothing until one exists for this service:
 * visitors never see a placeholder, and the QC placeholder check still lists the missing story.
 * Never write an invented story here.
 */
export function CaseNote({ service }: { service: string }) {
  const note = business.caseNotes.find((n) => n.service === service);
  if (!note) return null;
  return (
    <aside className="my-10 overflow-hidden rounded-xl bg-white ring-1 ring-alu/70" aria-label="From the job file">
      <div className="flex items-center justify-between gap-3 bg-teal-deep px-5 py-3 text-white">
        <p className="!text-sea text-sm font-bold uppercase tracking-[0.14em]">From the job file{note.location ? ` · ${note.location}` : ""}</p>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="!mt-0 text-xl">{note.title}</h3>
        <p className="mt-2">{note.story}</p>
        <p className="mt-3 text-sm text-frame-soft">As told by {business.founderName}, founder of {business.brandName}.</p>
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
      </div>
    </aside>
  );
}
