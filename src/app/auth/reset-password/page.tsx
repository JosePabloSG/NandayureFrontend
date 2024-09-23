'use client';
import ResetPasswordForm from '@/components/auth/reset-password/reset-password-form';
import { titleFont } from '@/config/fonts';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordTokenPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if (!token) return null;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-24 select-none">
      <div className="w-full sm:w-96 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5
          className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}
        >
          Recuperar contraseña
        </h5>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Por favor, introduce tu nueva contraseña.
        </p>
        <ResetPasswordForm token={token} />
      </div>
    </main>
  );
}
