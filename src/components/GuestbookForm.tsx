'use client';

import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { submitEntry } from '@app/server/guestbook';

export const GuestbookForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [fax, setFax] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await submitEntry({ data: { name, message, fax } });

    if (result.success) {
      setName('');
      setMessage('');
      router.invalidate();
    } else if (result.error === 'rate_limit') {
      setError('Too many guestbook entries, please try again later.');
    } else if (result.error === 'validation') {
      setError('Please fill out all required fields.');
    } else {
      setError('Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-retro-navy border-retro-gray mb-7.5 border-[3px] [border-style:ridge] p-5">
      <h2 className="text-neon-yellow mb-3.75 text-xl underline">Sign the Guestbook!</h2>
      <form onSubmit={handleSubmit}>
        {/* Honeypot field - hidden from humans, bots fill it out */}
        <div className="absolute -left-2499.75" aria-hidden="true">
          <label htmlFor="fax">Fax Number:</label>
          <input
            type="text"
            id="fax"
            name="fax"
            tabIndex={-1}
            autoComplete="off"
            value={fax}
            onChange={(e) => setFax(e.target.value)}
          />
        </div>

        <div className="mb-3.75">
          <label htmlFor="name" className="text-neon-cyan mb-1.25 block">
            Your Name: *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-retro-gray-dark w-full border-2 [border-style:inset] bg-white p-2 font-mono text-sm text-black"
          />
        </div>

        <div className="mb-3.75">
          <label htmlFor="message" className="text-neon-cyan mb-1.25 block">
            Your Message: *
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-retro-gray-dark h-25 w-full resize-y border-2 [border-style:inset] bg-white p-2 font-mono text-sm text-black"
          />
        </div>

        {error && <p className="mb-3.75 text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="border-retro-gray bg-retro-gray font-system cursor-pointer border-2 [border-style:outset] px-7.5 py-2.5 text-sm text-black active:[border-style:inset] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Signing...' : 'Sign Guestbook!'}
        </button>
      </form>
    </div>
  );
};
