import { Student } from '@/components/Students/Student';

interface StudentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentPage({ params }: StudentPageProps) {
  const { id } = await params;
  return <Student studentId={id} />;
}