import { FC, ReactNode } from 'react';

export const H3: FC<{ children: ReactNode }> = ({ children }) => {
  return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>;
};
