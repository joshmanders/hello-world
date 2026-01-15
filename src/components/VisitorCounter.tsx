'use client';

import { useEffect, useState } from 'react';
import { getVisitorCount } from '@app/server/visits';

export const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getVisitorCount().then(setCount);
  }, []);

  const digits = count.toString().padStart(6, '0').split('');

  return (
    <div className="bg-retro-purple border-retro-gray mx-auto mb-5 w-fit border-[3px] [border-style:ridge] p-3.75 text-center">
      <div className="text-neon-yellow mb-2.5 text-lg">★ You are visitor number: ★</div>
      <div className="inline-flex gap-0.5">
        {digits.map((digit, i) => (
          <span
            key={i}
            className="text-neon-green border-retro-gray-dark min-w-6.25 border-2 [border-style:inset] bg-black px-2 py-1.25 text-center font-mono text-2xl font-bold"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
};
