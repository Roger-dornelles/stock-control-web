interface TooltipProps {
  children?: React.ReactNode;
  description: string;
}

const Tooltip = ({ description, children }: TooltipProps) => {
  return (
    <>
      <div className="group relative">
        <span className="relative flex items-center gap-2">
          {children && (
            <span className="text-sm text-gray-300">{children}</span>
          )}
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            />
          </svg>

          <div className="invisible absolute bottom-full left-1/2 mb-3 w-72 -translate-x-1/2 translate-y-2 transform opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-4 shadow-[0_0_30px_rgba(79,70,229,0.15)] backdrop-blur-md">
              <div className="space-y-2">
                <p className="text-sm text-gray-300">{description}</p>
              </div>

              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-white/10 bg-gradient-to-br from-gray-800/95 to-gray-800/95" />
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default Tooltip;
