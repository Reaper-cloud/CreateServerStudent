import Page from '@/components/layout/Page/Page';
import Students from '@/components/Students/Students';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Студенты - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
};

const GroupsPage = (): React.ReactNode => (
  <Page>
    <h1>Студенты</h1>
    <Students />
  </Page>
);

export default GroupsPage;
