import { FC, ReactNode } from 'react';

export const H2: FC<{ children: ReactNode }> = ({ children }) => {
  return <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>;
};
