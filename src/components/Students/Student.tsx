'use client';

import useStudents from '@/hooks/useStudents';
import { BackButton } from '@/components/BackButton/BackButton';
import Link from 'next/link';

interface StudentProps {
  studentId: string;
}

export const Student = ({ studentId }: StudentProps) => {
  const { getStudentById, isLoading, students } = useStudents();
  
  const student = getStudentById(studentId);

  // Навигация между студентами
  const currentIndex = students.findIndex(s => s.id.toString() === studentId);
  const nextStudent = currentIndex < students.length - 1 ? students[currentIndex + 1] : null;
  const prevStudent = currentIndex > 0 ? students[currentIndex - 1] : null;

  if (isLoading) {
    return <div className="flex justify-center p-8">Загрузка...</div>;
  }

  if (!student) {
    return (
      <div className="p-6">
        <BackButton href="/students">
          &lt;&lt; список студентов
        </BackButton>
        <div className="text-center text-gray-500 mt-4">
          Студент с ID {studentId} не найден
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BackButton href="/students">
        &lt;&lt; список студентов
      </BackButton>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Остальной код компонента Student без изменений */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {student.lastName} {student.firstName} {student.middleName}
            </h1>
            <p className="text-gray-600 mt-2">ID: {student.id}</p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            student.isDeleted 
              ? 'bg-red-100 text-red-800' 
              : student.isCreating
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {student.isDeleted ? 'Удален' : student.isCreating ? 'Создается...' : 'Активен'}
          </div>
        </div>

        {/* Добавляем навигацию между студентами */}
        {(prevStudent || nextStudent) && (
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex justify-between text-sm">
              {prevStudent ? (
                <Link 
                  href={`/students/${prevStudent.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  ← {prevStudent.lastName} {prevStudent.firstName}
                </Link>
              ) : (
                <span></span>
              )}
              
              {nextStudent ? (
                <Link 
                  href={`/students/${nextStudent.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {nextStudent.lastName} {nextStudent.firstName} →
                </Link>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        )}

        {/* Остальная информация о студенте */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ... остальной код информации о студенте ... */}
        </div>
      </div>
    </div>
  );
};