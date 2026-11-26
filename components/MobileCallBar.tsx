import Link from "next/link";
import { telHref } from "@/content/business";
import { PhoneIcon } from "./Icons";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-alu bg-alu md:hidden">
      <a href={telHref} className="flex h-[4.5rem] items-center justify-center gap-2 bg-bronze text-lg font-semibold text-white no-underline">
        <PhoneIcon className="h-5 w-5" /> Call
      </a>
      <Link href="/contact#quote" className="flex h-[4.5rem] items-center justify-center bg-teal text-lg font-semibold text-white no-underline">
        Get a quote
      </Link>
    </div>
  );
}
