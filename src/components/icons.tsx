export type IconType = keyof typeof Icon;

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icon = {
  arrowDown: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 16L4 8H20L12 16Z" fill="currentColor" />
    </svg>
  )
};
