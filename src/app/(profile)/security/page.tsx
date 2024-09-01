import ChangePasswordForm from '@/components/auth/change-password/change-password-form';
import { titleFont } from '@/config/fonts';

const SecurityPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center w-full p-4">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h1 className={`${titleFont.className} text-3xl font-bold text-gray-900`}>Seguridad</h1>
          <p className="text-gray-500">
            Cambia tu contraseña para mantener tu cuenta segura
          </p>
        </div>
        <ChangePasswordForm />
      </div>
    </main>
  );
};

export default SecurityPage;
