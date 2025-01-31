'use client';

import { AuthProvider } from '@/lib/auth-context';
import Providers from '@/app/providers/providers';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Providers>
        {children}
      </Providers>
    </AuthProvider>
  );
}
