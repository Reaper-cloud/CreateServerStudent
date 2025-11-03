// src/app/students/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import  useStudent from "@/hooks/useStudents";
import  Student  from '@/components/Students/Students';
import  StudentInterface  from '@/types/StudentInterface';

export default function StudentPage() {
  const params = useParams();
  const id = params.id as string;
  const { getStudent } = useStudent();
  const [student, setStudent] = useState<StudentInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true);
        const studentData = await getStudent(parseInt(id));
        setStudent(studentData);
      } catch (err) {
        setError('Ошибка при загрузке данных студента');
        console.error('Error loading student:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadStudent();
    }
  }, [id, getStudent]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка данных студента...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">Студент не найден</p>
        </div>
      </div>
    );
  }
}