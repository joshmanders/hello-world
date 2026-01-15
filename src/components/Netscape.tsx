import { ReactNode } from 'react';
import { cn } from '@app/lib/utils';

interface NetscapeProps {
  title: string;
  url: string;
  children: ReactNode;
}

export const Netscape = ({ title, url, children }: NetscapeProps) => {
  return (
    <div className="bg-retro-gray flex min-h-full w-full flex-1 flex-col">
      {/* Browser Chrome (sticky) */}
      <div className="border-retro-gray-dark bg-retro-gray sticky top-0 z-100 border-b-2">
        {/* Title Bar */}
        <div className="from-retro-dark-blue to-retro-light-blue font-system flex items-center justify-between bg-linear-to-r px-1 py-0.5 text-xs font-bold text-white">
          <div className="flex items-center gap-1">
            <span>N</span>
            <span>Netscape - [{title}]</span>
          </div>
          <div className="flex gap-0.5">
            <div className="border-b-retro-gray-dark border-r-retro-gray-dark bg-retro-gray flex h-3.5 w-4 cursor-pointer items-center justify-center border border-t-white border-l-white text-[9px] leading-none">
              _
            </div>
            <div className="border-b-retro-gray-dark border-r-retro-gray-dark bg-retro-gray flex h-3.5 w-4 cursor-pointer items-center justify-center border border-t-white border-l-white text-[9px] leading-none">
              □
            </div>
            <div className="border-b-retro-gray-dark border-r-retro-gray-dark bg-retro-gray flex h-3.5 w-4 cursor-pointer items-center justify-center border border-t-white border-l-white text-[9px] leading-none">
              ×
            </div>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="border-retro-gray-dark bg-retro-gray font-system border-b px-1 py-0.5 text-xs">
          <span className="hover:bg-retro-dark-blue cursor-pointer px-1.5 py-px hover:text-white">
            <u>F</u>ile
          </span>{' '}
          <span className="hover:bg-retro-dark-blue cursor-pointer px-1.5 py-px hover:text-white">
            <u>E</u>dit
          </span>{' '}
          <span className="hover:bg-retro-dark-blue cursor-pointer px-1.5 py-px hover:text-white">
            <u>V</u>iew
          </span>{' '}
          <span className="hover:bg-retro-dark-blue cursor-pointer px-1.5 py-px hover:text-white">
            <u>G</u>o
          </span>{' '}
          <span className="hover:bg-retro-dark-blue cursor-pointer px-1.5 py-px hover:text-white">
            <u>B</u>ookmarks
          </span>{' '}
          <span className="hover:bg-retro-dark-blue hidden cursor-pointer px-1.5 py-px hover:text-white md:inline">
            <u>O</u>ptions
          </span>{' '}
          <span className="hover:bg-retro-dark-blue hidden cursor-pointer px-1.5 py-px hover:text-white md:inline">
            <u>D</u>irectory
          </span>{' '}
          <span className="hover:bg-retro-dark-blue cursor-pointer px-1.5 py-px hover:text-white">
            <u>W</u>indow
          </span>{' '}
          <span className="hover:bg-retro-dark-blue cursor-pointer px-1.5 py-px hover:text-white">
            <u>H</u>elp
          </span>
        </div>

        {/* Toolbar */}
        <div className="border-retro-gray-dark bg-retro-gray flex items-stretch gap-0.5 border-b p-1">
          <ToolbarButton icon="⬅" label="Back" onClick={() => history.back()} />
          <ToolbarButton icon="⬅" label="Forward" onClick={() => history.forward()} iconRotation={180} />
          <ToolbarButton icon="🏠" label="Home" href="https://primcloud.com" />
          <ToolbarButton icon="🔄" label="Reload" onClick={() => location.reload()} />
          <ToolbarButton icon="🖼" label="Images" disabled className="hidden md:flex" />
          <ToolbarButton icon="📂" label="Open" disabled className="hidden md:flex" />
          <ToolbarButton icon="🖨" label="Print" disabled className="hidden md:flex" />
          <ToolbarButton icon="🔍" label="Find" disabled className="hidden md:flex" />
          <ToolbarButton icon="🛑" label="Stop" disabled className="hidden md:flex" />
          <div className="flex-1" />
          <div className="border-b-retro-gray-dark border-r-retro-gray-dark from-retro-dark-blue mr-1 flex h-9 w-9 shrink-0 items-center justify-center border-2 border-t-white border-l-white bg-linear-to-br to-[#4169e1] font-serif text-xl font-bold text-white">
            N
          </div>
        </div>

        {/* Location Bar */}
        <div className="bg-retro-gray font-system flex items-center gap-1 p-1 text-xs">
          <label className="hidden font-bold md:inline">Location:</label>
          <input
            type="text"
            value={url}
            readOnly
            className="border-t-retro-gray-dark border-l-retro-gray-dark flex-1 border-2 border-r-white border-b-white bg-white px-1 py-0.5 text-xs"
          />
        </div>
      </div>

      {/* Page Content */}
      <div
        className="text-neon-green flex flex-1 flex-col items-center overflow-y-auto"
        style={{
          background: `radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px), #000033`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
        }}
      >
        <div className="flex w-full max-w-5xl flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  iconRotation?: number;
}

const ToolbarButton = ({ icon, label, onClick, href, disabled, className, iconRotation }: ToolbarButtonProps) => {
  const classes = cn(
    'flex w-[58px] flex-col items-center justify-center border-2 bg-retro-gray px-1.5 py-1 font-system text-[11px] no-underline',
    'border-b-retro-gray-dark border-l-white border-r-retro-gray-dark border-t-white',
    disabled
      ? 'cursor-default opacity-60'
      : 'cursor-pointer active:border-b-white active:border-l-retro-gray-dark active:border-r-white active:border-t-retro-gray-dark',
    className
  );

  const content = (
    <>
      <span
        className="mb-0.5 text-base"
        style={iconRotation ? { display: 'inline-block', transform: `rotate(${iconRotation}deg)` } : undefined}
      >
        {icon}
      </span>
      {label}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={disabled ? undefined : onClick} className={classes} disabled={disabled}>
      {content}
    </button>
  );
};
