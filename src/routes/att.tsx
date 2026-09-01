import { createFileRoute } from '@tanstack/react-router';

const AttPage = () => {
  return (
    <div className="flex-1 px-5 sm:px-0">
      {/* Main Title */}
      <h1
        className="animate-rainbow mb-2.5 text-center text-[48px] font-bold"
        style={{
          background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff, #ff0080)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(2px 2px 0 #000)',
        }}
      >
        We love AT&T
      </h1>
    </div>
  );
};

export const Route = createFileRoute('/att')({
  component: AttPage,
  head: () => ({
    meta: [{ title: 'We love AT&T' }],
  }),
});
