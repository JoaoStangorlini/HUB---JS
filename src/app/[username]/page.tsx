// Este programa é um software livre (Licença AGPLv3)
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import SharedWorkspaceClient from './SharedWorkspaceClient';

interface PageProps {
  params: Promise<{ username: string }>;
}

export const dynamic = 'force-dynamic';

export default async function SharedProfilePage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createClient();

  // Fetch the profile by username using RLS select (which we set to true)
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      <SharedWorkspaceClient profile={profile} />
    </div>
  );
}
