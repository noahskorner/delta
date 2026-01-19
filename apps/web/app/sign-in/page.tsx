'use client';

import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { ROUTES } from '@/app/routes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type LoginFormSchema = z.infer<typeof schema>;

export default function SignInPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async ({ email }: LoginFormSchema) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    const result = await signIn('email', {
      email,
      callbackUrl: ROUTES.dashboard.home,
      redirect: false,
    });

    if (result?.error) {
      setSubmitError('We could not send the magic link. Please try again.');
      return;
    }

    setSubmitSuccess('Check your email for a sign-in link.');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <Card className="relative z-10 w-full max-w-lg border-border/60 bg-background/85 shadow-xl">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-semibold">Sign in to delta</CardTitle>
            <p className="text-sm text-muted-foreground">
              We will email you a magic link. No password required.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          inputMode="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use the email you want associated with your account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitError ? (
                  <div
                    className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    role="alert"
                  >
                    {submitError}
                  </div>
                ) : null}

                {submitSuccess ? (
                  <div
                    className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700"
                    role="status"
                  >
                    {submitSuccess}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Sending magic link...' : 'Send magic link'}
                </Button>
              </form>
            </Form>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <span>
                New here?{' '}
                <Link
                  className="font-medium text-foreground hover:underline"
                  href={ROUTES.signUp}
                >
                  Create an account
                </Link>
              </span>
              <Link className="hover:underline" href={ROUTES.home}>
                Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
