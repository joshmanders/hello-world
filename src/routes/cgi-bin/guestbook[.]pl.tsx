import { createFileRoute, Link } from '@tanstack/react-router';
import { GuestbookEntry, EntryDivider } from '@app/components/GuestbookEntry';
import { GuestbookForm } from '@app/components/GuestbookForm';
import { getEntries } from '@app/server/guestbook';

const GuestbookPage = () => {
  const { entries, page, totalPages } = Route.useLoaderData();

  return (
    <>
      <div className="flex-1 px-5">
        <h1 className="text-neon-yellow my-5 text-center text-[36px]" style={{ textShadow: '2px 2px #ff00ff' }}>
          ~*~ My Guestbook ~*~
        </h1>
        <p className="text-neon-cyan mb-7.5 text-center">Thanks for stopping by! Please sign my guestbook!</p>

        <div className="mb-5 block text-center">
          <Link to="/" className="text-neon-magenta text-lg">
            &lt;&lt;&lt; Back to Homepage &lt;&lt;&lt;
          </Link>
        </div>

        {/* Entries Section */}
        <div className="bg-retro-purple border-retro-gray border-[3px] [border-style:ridge] p-5">
          <h2 className="text-neon-yellow mb-3.75 text-center text-xl underline">~*~ Guestbook Entries ~*~</h2>

          {entries.length === 0 ? (
            <p className="text-neon-yellow p-7.5 text-center text-lg">No entries yet! Be the first to sign!</p>
          ) : (
            <>
              {entries.map((entry, index) => (
                <div key={entry.id}>
                  <GuestbookEntry entry={entry} />
                  {index < entries.length - 1 && <EntryDivider />}
                </div>
              ))}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="border-retro-gray mt-5 flex items-center justify-center gap-5 border-2 p-3.75"
              style={{ background: '#000066', borderStyle: 'ridge' }}
            >
              {page > 1 ? (
                <Link to="/cgi-bin/guestbook.pl" search={{ page: page - 1 }} className="text-neon-cyan font-bold">
                  &lt;&lt; Prev
                </Link>
              ) : (
                <span className="text-[#666]">&lt;&lt; Prev</span>
              )}
              <span className="text-neon-yellow">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link to="/cgi-bin/guestbook.pl" search={{ page: page + 1 }} className="text-neon-cyan font-bold">
                  Next &gt;&gt;
                </Link>
              ) : (
                <span className="text-[#666]">Next &gt;&gt;</span>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="animate-shimmer my-5 h-5 bg-[linear-gradient(90deg,transparent_0%,#ff0000_10%,#ff8000_20%,#ffff00_30%,#00ff00_40%,#00ffff_50%,#0080ff_60%,#8000ff_70%,#ff0080_80%,transparent_100%)]" />

        {/* Form Section */}
        <GuestbookForm />
      </div>

      {/* Footer */}
      <div className="border-retro-gray bg-retro-dark-purple border-t-2 [border-style:ridge] p-3.75 text-center">
        <p>
          <Link to="/" className="text-neon-cyan">
            Return to Homepage
          </Link>{' '}
          | Powered by CGI-BIN Magic!
        </p>
      </div>
    </>
  );
};

export const Route = createFileRoute('/cgi-bin/guestbook.pl')({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 1,
  }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) => {
    return await getEntries({ data: { page } });
  },
  head: () => ({
    meta: [{ title: 'Sign My Guestbook!!' }],
  }),
  component: GuestbookPage,
});
