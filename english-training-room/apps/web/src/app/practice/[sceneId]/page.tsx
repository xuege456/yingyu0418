import { notFound } from 'next/navigation';
import PracticePageClient from './PracticePageClient';

interface PageProps {
  params: Promise<{ sceneId: string }>;
}

export default async function PracticePage({ params }: PageProps) {
  const { sceneId } = await params;

  // Validate sceneId is a valid code
  const validCodes = ['sql-crud', 'sql-shortcuts', 'nextjs-basic', 'nextjs-shortcuts', 'cloudcode', 'ai-prompt', 'dev-english', 'cloudcode-commands', 'advanced'];
  if (!validCodes.includes(sceneId)) {
    notFound();
  }

  // For server-side rendering, we pass empty initialQuestions
  // The client will fetch from API
  return <PracticePageClient sceneCode={sceneId} />;
}