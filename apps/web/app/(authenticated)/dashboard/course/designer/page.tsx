import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { AUTH } from '@/app/auth';
import { ROUTES } from '@/app/routes';

import { CourseDesignerClient } from './course-designer';

export default async function CourseDesignerPage() {
  const session = await getServerSession(AUTH);
  if (!session?.user?.email) {
    return redirect(ROUTES.signIn);
  }

  return <CourseDesignerClient />;
}
