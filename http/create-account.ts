export async function createAccount(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<{ access_token: string; }> {
  const response = await fetch('https://sanare-api.vercel.app/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create account');
  }

  const result = await response.json();
  return result;
}