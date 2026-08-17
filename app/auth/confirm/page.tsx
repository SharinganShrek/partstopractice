import { Suspense } from 'react';
import AuthConfirmClient from './AuthConfirmClient';

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <p className="text-text-muted text-sm">Giriş yapılıyor...</p>
        </div>
      }
    >
      <AuthConfirmClient />
    </Suspense>
  );
}
