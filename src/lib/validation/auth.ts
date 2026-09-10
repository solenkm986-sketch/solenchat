import { z } from 'zod';

/**
 * Правила username вынесены отдельно и покрыты unit-тестами
 * (см. tests/unit/username.test.ts), т.к. это же регулярное выражение
 * используется в SQL-миграции 0001_init.sql (constraint username_format).
 */
export const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/;

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, 'Имя пользователя должно быть не короче 3 символов')
  .max(20, 'Имя пользователя должно быть не длиннее 20 символов')
  .regex(
    USERNAME_REGEX,
    'Только латинские буквы, цифры и знак подчёркивания'
  );

export const passwordSchema = z
  .string()
  .min(8, 'Пароль должен быть не короче 8 символов')
  .max(72, 'Пароль слишком длинный');

export const registerSchema = z
  .object({
    email: z.string().trim().email('Введите корректный e-mail'),
    username: usernameSchema,
    displayName: z
      .string()
      .trim()
      .min(2, 'Имя должно быть не короче 2 символов')
      .max(40, 'Имя должно быть не длиннее 40 символов'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email('Введите корректный e-mail'),
  password: z.string().min(1, 'Введите пароль'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
