import { business } from "@/content/business";

/** Florida service areas, straight from business.ts so they always match the footer and GBP. */
export function ServiceAreas() {
  return (
    <ul className="!mt-4 flex flex-wrap gap-2 !pl-0">
      {business.serviceAreas.map((a) => (
        <li key={a} className="!pl-0 before:!hidden">
          <span className="inline-block rounded border border-alu bg-white px-3 py-1.5 text-[0.95rem]">{a}</span>
        </li>
      ))}
    </ul>
  );
}
