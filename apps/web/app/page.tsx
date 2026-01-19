import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'delta | Home',
  description: 'AI-native courses, built fast and learned deeply.',
};

const featureCards = [
  {
    title: 'AI Course Builder',
    description:
      'Describe the outcome you want and generate a full syllabus with assets, exercises, and evaluations.',
  },
  {
    title: 'Asset Library',
    description:
      'Import from YouTube, PDFs, or URLs, then enrich with summaries, key concepts, and timing.',
  },
  {
    title: 'Learning Analytics',
    description:
      'Track milestones, scores, and time spent with feedback tailored to performance and intent.',
  },
  {
    title: 'Community Discovery',
    description:
      'Browse public courses by subject, difficulty, popularity, and duration across creators.',
  },
];

const steps = [
  {
    title: 'Define the mission',
    description: 'Set the subject, depth, and format that match how you want to learn.',
  },
  {
    title: 'Generate the path',
    description: 'Delta drafts a structured syllabus and populates every asset type.',
  },
  {
    title: 'Learn and level up',
    description: 'Complete assets, earn XP, and get feedback that maps your growth.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <span className="text-lg font-semibold">d</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                delta
              </p>
              <p className="text-sm text-muted-foreground">AI learning studio</p>
            </div>
          </div>
          <Button asChild variant="ghost">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </header>

        <main className="relative z-10">
          <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                Build courses at the speed of curiosity
              </div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                A faster way to design, discover, and complete AI-native courses.
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Delta turns rough ideas into structured learning paths. Generate assets, track
                progress, and collect feedback that keeps learners moving.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/sign-in">Get started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/sign-in">Explore demo</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Supabase-authenticated profiles
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Structured AI grading
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="border-border/60 bg-background/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base uppercase tracking-[0.2em] text-muted-foreground">
                    Course blueprint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-lg font-semibold">Modern Product Strategy</p>
                    <p className="text-sm text-muted-foreground">
                      Beginner · 5 weeks · 12 assets
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div key={step.title} className="flex gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {index + 1}
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/sign-in">Generate a new course</Link>
                  </Button>
                </CardContent>
              </Card>
              <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-border/60 bg-background/80 p-4 text-sm shadow-lg lg:block">
                <p className="font-semibold">Feedback in minutes</p>
                <p className="text-muted-foreground">LLM critique with strengths + gaps</p>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-6xl space-y-8 px-6 pb-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  What ships in delta
                </p>
                <h2 className="text-3xl font-semibold">All the building blocks for modern study</h2>
              </div>
              <Button asChild variant="outline">
                <Link href="/sign-in">View community courses</Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featureCards.map((feature) => (
                <Card key={feature.title} className="border-border/60 bg-background/80">
                  <CardHeader>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-28">
            <Card className="border-border/60 bg-gradient-to-br from-primary/10 via-background to-sky-500/10">
              <CardContent className="grid gap-6 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Motivation built in
                  </p>
                  <h3 className="text-2xl font-semibold">Earn XP, streaks, and badges</h3>
                  <p className="text-sm text-muted-foreground">
                    Reward loops keep learners engaged, while milestone checkpoints spotlight
                    progress and accountability.
                  </p>
                </div>
                <div className="grid gap-4 text-sm text-muted-foreground">
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="font-medium text-foreground">XP multipliers</p>
                    <p>Complete quizzes and reflections for boosted rewards.</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                    <p className="font-medium text-foreground">Streak protection</p>
                    <p>Track daily momentum without punishing breaks.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
