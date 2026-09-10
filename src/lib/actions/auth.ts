'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { loginSchema, registerSchema } from '@/lib/validation/auth';

export interface AuthActionResult {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function signInAction(
  _prev: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: 'Проверьте правильность заполнения полей' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Неверный e-mail или пароль' };
    }
    return { error: `Не удалось войти: ${error.message}` };
  }

  redirect('/');
}

export async function signUpAction(
  _prev: AuthActionResult,
  formData: FormData
): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse({
    email: formData.get('email'),
    username: formData.get('username'),
    displayName: formData.get('displayName'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { error: 'Проверьте правильность заполнения полей', fieldErrors };
  }

  const { email, password, username, displayName } = parsed.data;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, display_name: displayName },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Пользователь с таким e-mail уже зарегистрирован' };
    }
    return { error: `Не удалось зарегистрироваться: ${error.message}` };
  }

  redirect('/');
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
