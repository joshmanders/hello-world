import type { GuestbookEntry as GuestbookEntryType } from '@app/db/schema';

interface GuestbookEntryProps {
  entry: GuestbookEntryType;
}

export const GuestbookEntry = ({ entry }: GuestbookEntryProps) => (
  <div className="bg-retro-deep-navy border-retro-gray-dark mb-2.5 border p-3.75">
    <div className="mb-2.5 flex items-center justify-between">
      <span className="text-neon-yellow text-base font-bold">{entry.name}</span>
      <span className="text-retro-gray-dark text-[11px]">{new Date(entry.signedAt).toLocaleString()}</span>
    </div>
    <div className="text-neon-green leading-relaxed whitespace-pre-wrap">{entry.message}</div>
  </div>
);

export const EntryDivider = () => (
  <hr className="my-3.75 h-0.5 border-none bg-[linear-gradient(90deg,transparent,#ff00ff,#00ffff,#ffff00,transparent)]" />
);
