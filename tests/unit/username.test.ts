import { describe, it, expect } from 'vitest';
import { usernameSchema } from '@/lib/validation/auth';

describe('usernameSchema', () => {
  it('принимает корректные имена пользователей', () => {
    expect(usernameSchema.safeParse('alex_01').success).toBe(true);
    expect(usernameSchema.safeParse('mama').success).toBe(true);
  });

  it('приводит к нижнему регистру', () => {
    const result = usernameSchema.safeParse('Alex_01');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe('alex_01');
    }
  });

  it('отклоняет слишком короткое имя', () => {
    expect(usernameSchema.safeParse('ab').success).toBe(false);
  });

  it('отклоняет пробелы и спецсимволы', () => {
    expect(usernameSchema.safeParse('алекс').success).toBe(false);
    expect(usernameSchema.safeParse('alex 01').success).toBe(false);
    expect(usernameSchema.safeParse('alex@01').success).toBe(false);
  });

  it('отклоняет слишком длинное имя', () => {
    expect(usernameSchema.safeParse('a'.repeat(21)).success).toBe(false);
  });
});
