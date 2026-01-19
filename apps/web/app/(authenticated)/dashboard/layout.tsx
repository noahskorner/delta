import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getServerSession } from 'next-auth';
import { AUTH } from '@/app/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/app/routes';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(AUTH);
  const email = session?.user?.email;
  if (email == null) {
    return redirect(ROUTES.signIn);
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-screen h-screen overflow-hidden relative">
        <div className="flex flex-1 w-full pt-11">
          <main className="w-full h-[calc(100svh-2.5rem)] overflow-auto bg-sidebar">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
