'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function loginAurtistic(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/aurtistic/login?error=Credenciais inválidas');
  }

  revalidatePath('/aurtistic', 'layout');
  redirect('/aurtistic');
}

export async function signupAurtistic(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      }
    }
  });

  if (error) {
    redirect('/aurtistic/login?error=Erro ao criar conta: ' + error.message);
  }

  // Ensure user_profile exists if sign up is confirmed directly
  if (data?.user) {
    const newProfile = { id: data.user.id, quick_links: [], quick_filters: ['responsavel', 'dimensao'] };
    await supabase.from('user_profiles').insert(newProfile);
  }

  revalidatePath('/aurtistic', 'layout');
  redirect('/aurtistic');
}

export async function logoutAurtistic() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/aurtistic/login');
}
