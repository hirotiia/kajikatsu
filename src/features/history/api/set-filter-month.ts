'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function setFilterMonth({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const cookieStore = await cookies();
  cookieStore.set('filter_year', String(year));
  cookieStore.set('filter_month', String(month));
  revalidatePath('/history');
}
