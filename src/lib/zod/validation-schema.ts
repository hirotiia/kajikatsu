import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'タイトルが入力されていません。'),
  status: z.string().min(1, 'ステータスを選択してください。'),
  deadline: z.string().nullable(),
  description: z.string().nullable(),
  assignment: z.string().nullable(),
});

export const updateTaskSchema = z.object({
  taskId: z.string().uuid(),
  title: z.string().min(1, 'タイトルが入力されていません。'),
  description: z.string().nullable(),
  expires_at: z.string().nullable(),
  status_id: z.string().uuid().nullable(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('メールアドレスは必須です')
    .email('正しい形式のメールアドレスを入力してください'),
  password: z
    .string()
    .nonempty('パスワードは必須です')
    .min(8, 'パスワードは8文字以上必要です'),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .nonempty('ユーザー名が入力されていません')
    .max(50, 'ユーザー名は50文字以下で入力してください'),
  email: z
    .string()
    .nonempty('メールアドレスが入力されていません')
    .email('メールアドレスの形式が不正です'),
  password: z
    .string()
    .nonempty('パスワードが入力されていません')
    .min(8, 'パスワードは8文字以上が必要です'),
});
