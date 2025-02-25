import { getSession } from 'next-auth/react';

interface HttpClientOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  data?: any;
  headers?: HeadersInit;
}

async function httpClient<T>({
  method,
  endpoint,
  data,
  headers,
}: HttpClientOptions): Promise<T> {
  const session = await getSession();
  const token = session?.user?.access_token as string;

  // Verificar si los datos son de tipo FormData
  const isFormData = data instanceof FormData;

  const config: RequestInit = {
    method,
    headers: {
      // Solo establecer 'Content-Type' si no es FormData
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    // Configurar el cuerpo de la solicitud
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
    config,
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || 'Ocurrió un error en la solicitud',
    );
  }

  return responseData as T;
}

export default httpClient;
