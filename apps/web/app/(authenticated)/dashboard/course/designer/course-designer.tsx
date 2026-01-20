'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const SAMPLE_PROMPTS = [
  'Design a beginner-friendly course on brand strategy for startups.',
  'Create a 6-week course outline for full-stack web development.',
  'Build a course on leadership coaching with weekly assignments.',
];

const MOCK_SYLLABUS = {
  title: 'Product Design With AI: From Prompt to Prototype',
  objectives: [
    'Translate messy ideas into clear learning outcomes.',
    'Use AI to draft modules, assignments, and assessment rubrics.',
    'Balance human critique with AI-generated direction.',
    'Ship a complete course plan with assets and timelines.',
  ],
  assignments: [
    'Assignment 1: Map learner personas and success metrics.',
    'Assignment 2: Draft a 3-module outline with AI critiques.',
    'Assignment 3: Prototype a lesson with interactive prompts.',
  ],
  quizzes: [
    'Quiz 1: Prompt hygiene and instruction hierarchies.',
    'Quiz 2: Learning science fundamentals.',
  ],
  homework: [
    'Weekly reading reflections with AI-generated summaries.',
    'Peer review and revision sprint after each module.',
  ],
  finalProject:
    'Final project: ship a 4-week, AI-assisted course with outcomes, assets, and assessments.',
};

export function CourseDesignerClient() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const hasConversation = hasStarted || messages.length > 0;

  const submitPrompt = (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      return;
    }

    sendMessage({ text: trimmed });
    setInput('');
    setHasStarted(true);
  };

  return (
    <div className="flex h-full min-h-[80vh] flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold">Course Designer</h1>
          <Badge variant="secondary">AI-assisted</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Co-create a course with an AI partner. Drafts are mock data until the syllabus builder is
          wired up.
        </p>
      </header>

      {!hasConversation ? (
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>Start a new course</CardTitle>
              <CardDescription>
                Describe the course you want to build and the AI will propose a full syllabus.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                className="flex flex-col gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitPrompt(input);
                }}
              >
                <Input
                  value={input}
                  placeholder="e.g. Create a 5-week product strategy course for founders"
                  onChange={(event) => setInput(event.currentTarget.value)}
                />
                <Button type="submit">Generate syllabus</Button>
              </form>
              <Separator />
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span>Try a quick prompt:</span>
                <div className="flex flex-col gap-2">
                  {SAMPLE_PROMPTS.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      className="justify-start text-left"
                      onClick={() => submitPrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-1 rounded-xl border bg-card">
          <ResizablePanelGroup direction="horizontal" className="min-h-[70vh] flex-1">
            <ResizablePanel defaultSize={40} minSize={28} className="flex flex-col">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Conversation</p>
                  <p className="text-xs text-muted-foreground">All prompts and AI replies</p>
                </div>
                <Badge variant="secondary">{messages.length} messages</Badge>
              </div>
              <ScrollArea className="flex-1 px-4 py-4">
                <div className="flex flex-col gap-3 pb-4">
                  {messages.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                      Your first prompt will appear here.
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'flex',
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div className="max-w-[80%] space-y-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
                          <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            {message.role === 'user' ? 'You' : 'Assistant'}
                          </span>
                          <div className="space-y-2 whitespace-pre-wrap">
                            {message.parts.map((part, index) => {
                              if (part.type !== 'text') {
                                return null;
                              }

                              return <p key={`${message.id}-${index}`}>{part.text}</p>;
                            })}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
              <Separator />
              <form
                className="flex gap-2 p-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitPrompt(input);
                }}
              >
                <Input
                  value={input}
                  placeholder="Ask for changes, add lessons, refine goals..."
                  onChange={(event) => setInput(event.currentTarget.value)}
                />
                <Button type="submit">Send</Button>
              </form>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60} minSize={35} className="flex flex-col">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Syllabus</p>
                  <p className="text-xs text-muted-foreground">Mock draft based on AI input</p>
                </div>
                <Badge variant="outline">Draft</Badge>
              </div>
              <ScrollArea className="flex-1 px-4 py-4">
                <div className="space-y-4 pb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{MOCK_SYLLABUS.title}</CardTitle>
                      <CardDescription>Generated syllabus (mock data)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">Objectives</p>
                        <ul className="space-y-1 text-muted-foreground">
                          {MOCK_SYLLABUS.objectives.map((objective) => (
                            <li key={objective}>• {objective}</li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">Assignments</p>
                        <ul className="space-y-1 text-muted-foreground">
                          {MOCK_SYLLABUS.assignments.map((assignment) => (
                            <li key={assignment}>• {assignment}</li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">Quizzes</p>
                        <ul className="space-y-1 text-muted-foreground">
                          {MOCK_SYLLABUS.quizzes.map((quiz) => (
                            <li key={quiz}>• {quiz}</li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">Homework</p>
                        <ul className="space-y-1 text-muted-foreground">
                          {MOCK_SYLLABUS.homework.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">Final Project</p>
                        <p className="text-muted-foreground">{MOCK_SYLLABUS.finalProject}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  );
}
