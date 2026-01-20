import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Bookmark,
  CircleUser,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';

import { AUTH } from '@/app/auth';
import { ROUTES } from '@/app/routes';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const NAV_SECTIONS = [
  {
    label: 'Courses',
    items: [
      {
        label: 'Overview',
        icon: LayoutDashboard,
        href: ROUTES.dashboard.home,
        active: true,
      },
      { label: 'My Courses', icon: BookOpen, disabled: true },
      { label: 'Assignments', icon: GraduationCap, disabled: true },
      { label: 'Saved Assets', icon: Bookmark, disabled: true },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Discover', icon: Compass, disabled: true },
      { label: 'Creators', icon: Users, disabled: true },
      { label: 'Leaderboard', icon: Trophy, disabled: true },
    ],
  },
  {
    label: 'AI Studio',
    items: [
      { label: 'Generate Course', icon: Sparkles, disabled: true },
      { label: 'Feedback Lab', icon: CircleUser, disabled: true },
    ],
  },
];

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(AUTH);
  const email = session?.user?.email;
  if (email == null) {
    return redirect(ROUTES.signIn);
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  const initials = email
    .split('@')[0]
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase())
    .join('');

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <div
            className="flex items-center justify-between gap-2 rounded-lg border
            border-sidebar-border/70 bg-sidebar/40 px-2 py-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground
                shadow-sm"
              >
                <Sparkles className="size-4" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">delta</p>
                <p className="text-xs text-sidebar-foreground/70">AI course studio</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="hidden text-[10px] uppercase tracking-wide md:flex"
            >
              Beta
            </Badge>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {NAV_SECTIONS.map((section) => (
            <SidebarGroup key={section.label}>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      {item.href ? (
                        <SidebarMenuButton asChild isActive={item.active}>
                          <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton disabled aria-disabled="true">
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton disabled aria-disabled="true">
                <Settings />
                <span>Workspace Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header
          className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4
          backdrop-blur md:px-6"
        >
          <SidebarTrigger />
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Settings">
                <Settings className="size-4" />
              </Button>
              <ThemeSwitcher />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="size-7">
                      <AvatarFallback>{initials || 'DT'}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium md:inline">{email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="space-y-1">
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                      Signed in as
                    </span>
                    <span className="block truncate text-sm font-medium">{email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col px-4 py-6 md:px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
