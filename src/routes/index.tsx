import { createFileRoute, Link } from '@tanstack/react-router';
import { VisitorCounter } from '@app/components/VisitorCounter';
import { cn } from '@app/lib/utils';

const WelcomeSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-retro-navy border-retro-gray text-neon-cyan mb-5 border-[3px] [border-style:ridge] p-3.75">
    <h2 className="text-neon-yellow mb-2.5 text-center text-2xl underline">{title}</h2>
    <div className="text-center text-sm leading-relaxed">{children}</div>
  </div>
);

const Divider = () => (
  <div className="animate-shimmer my-5 h-5 bg-[linear-gradient(90deg,transparent_0%,#ff0000_10%,#ff8000_20%,#ffff00_30%,#00ff00_40%,#00ffff_50%,#0080ff_60%,#8000ff_70%,#ff0080_80%,transparent_100%)]" />
);

const Badge = ({ children, href }: { children: React.ReactNode; href?: string }) => {
  const baseClasses =
    'bg-retro-gray text-black py-1.25 px-2.5 text-xs border-2 [border-color:#fff_#808080_#808080_#fff] font-system no-underline';

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, 'cursor-pointer hover:underline active:border-[#808080_#fff_#fff_#808080]')}
      >
        {children}
      </a>
    );
  }

  return <span className={cn(baseClasses, 'cursor-default')}>{children}</span>;
};

const HomePage = () => {
  return (
    <>
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
          HELLO WORLD!
        </h1>

        {/* Marquee */}
        <div className="bg-neon-yellow border-retro-gray mb-3.75 overflow-hidden border-[3px] [border-style:ridge] p-2 text-[#ff0000]">
          <div className="animate-marquee inline-block text-lg font-bold whitespace-nowrap">
            ★★★ Welcome to the FIRST app EVER deployed to Primcloud.com!!! ★★★ Making internet history one deploy at a
            time! ★★★ Thanks for visiting my homepage!!! ★★★
          </div>
        </div>

        {/* Under Construction */}
        <div className="border-construction-yellow mb-5 flex items-center justify-center gap-2.5 border-2 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#ffcc00_10px,#ffcc00_20px)] p-2.5">
          <span className="animate-bounce-hat text-[32px]">🚧</span>
          <span className="bg-construction-yellow px-3.75 py-1.25 text-sm font-bold text-black">
            UNDER CONSTRUCTION - MORE COOL STUFF COMING SOON!
          </span>
          <span className="animate-bounce-hat text-[32px]">👷</span>
        </div>

        {/* Welcome Sections */}
        <WelcomeSection title="~*~ Welcome to My Homepage!! ~*~">
          <p>
            Hey there, fellow netizen! You've stumbled upon something HISTORIC!!
            <br />
            <br />
            This humble page is the VERY FIRST application ever deployed to <strong>Primcloud</strong>! Just like every
            programmer's journey begins with "Hello World," every great platform begins with its first app.
            <br />
            <br />
            So here we are, making history together! <span className="animate-wiggle inline-block">📧</span> Email me at{' '}
            <a href="mailto:webmaster@primcloud.com" className="text-neon-magenta">
              webmaster@primcloud.com
            </a>
            !
          </p>
        </WelcomeSection>

        <WelcomeSection title='~*~ The History of "Hello World" ~*~'>
          <p>
            The tradition of "Hello, World!" dates back to <strong>1972</strong> when Brian Kernighan used it in
            internal documentation at Bell Labs for the B programming language. It became famous in 1978 when Kernighan
            and Dennis Ritchie included it in <em>"The C Programming Language"</em> - one of the most influential
            programming books ever written.
            <br />
            <br />
            Since then, "Hello, World!" has become the universal first program that every developer writes when learning
            a new language. It's simple, it's satisfying, and it proves one magical thing:{' '}
            <strong>your code works!</strong>
            <br />
            <br />
            From C to Python, from Java to JavaScript, from assembly to Rust - billions of programmers have typed these
            two words as their very first step into a new world of possibilities.
          </p>
        </WelcomeSection>

        <WelcomeSection title="~*~ What This Means for Primcloud ~*~">
          <p>
            Every great platform has to start somewhere. AWS had its first S3 bucket. Heroku had its first dyno. Vercel
            had its first deployment. And now, <strong>Primcloud has this very page!</strong>
            <br />
            <br />
            Just as "Hello, World!" represents a programmer's first successful step, this app represents Primcloud's
            first successful deployment - proof that the platform works and is ready to host your applications.
            <br />
            <br />
            You're not just viewing a webpage. You're witnessing the beginning of something new. Someday, thousands of
            apps will call Primcloud home, and they'll all trace their lineage back to this moment - this humble "Hello,
            World!" that started it all.
            <br />
            <br />
            <strong>Welcome to the ground floor of something awesome!</strong> 🚀
          </p>
        </WelcomeSection>

        <Divider />

        {/* Guestbook CTA */}
        <div className="my-5 border-[3px] [border-style:ridge] border-[gold] bg-[linear-gradient(180deg,var(--color-cta-purple-light)_0%,var(--color-cta-purple-dark)_100%)] p-5 text-center">
          <h2 className="animate-glow mb-3.75 text-[28px] text-[gold] [text-shadow:2px_2px_#000]">
            ✨ Be Part of History! ✨
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[#ffccff]">
            Want to leave your mark on this historic moment? Sign the guestbook and become one of the first people to
            witness and celebrate Primcloud's very first deployment!
            <br />
            <br />
            Years from now, when Primcloud is hosting millions of applications, you can say{' '}
            <em className="text-neon-yellow">
              "I was there at the beginning - and I signed the guestbook to prove it!"
            </em>
          </p>
          <Link
            to="/cgi-bin/guestbook.pl"
            search={{ page: 1 }}
            className="border-cta-pink-light animate-pulse-scale inline-block cursor-pointer border-[3px] [border-style:outset] bg-[linear-gradient(180deg,var(--color-cta-pink)_0%,var(--color-cta-pink-dark)_50%,var(--color-cta-pink-darker)_100%)] px-7.5 py-3 text-xl font-bold text-white no-underline"
          >
            ✏️ Sign the Guestbook!! ✏️
          </Link>
        </div>

        {/* Spinning Globe */}
        <div className="animate-spin-globe my-3.75 text-center text-[48px]">🌐</div>

        {/* Visitor Counter */}
        <VisitorCounter />

        <Divider />
      </div>

      {/* Footer */}
      <div className="border-retro-gray bg-retro-dark-purple border-t-2 [border-style:ridge] p-3.75 text-center">
        <div className="mb-3.75 flex flex-wrap justify-center gap-3.75">
          <Badge>
            Best viewed with
            <br />
            Netscape Navigator 4.0
          </Badge>
          <Badge href="https://github.com/joshmanders/hello-world">
            Made with
            <br />
            Notepad
          </Badge>
          <Badge>
            JavaScript
            <br />
            Enhanced!
          </Badge>
        </div>
        <p className="text-retro-gray-dark text-xs">
          © 2026 | Proudly powered by{' '}
          <a
            href="https://primcloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:text-neon-yellow no-underline hover:underline"
          >
            Primcloud
          </a>
          <br />
          Last updated: Just now!
        </p>
      </div>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [{ title: 'Hello World!' }],
  }),
});
