import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavLink({
  href,
  children,
  external,
  onClick,
  className = "text-sm font-medium transition-colors hover:text-orange-300",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </Link>
  );
}
