// type imports
import type { JSX, ReactNode } from "react";

export default function Badge({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <div className="badge">{children}</div>;
}
