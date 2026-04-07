import type { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren;

export const Layout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};
