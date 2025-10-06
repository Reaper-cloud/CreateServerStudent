'use client';

import styles from './Students.module.scss';
import StudentInterface from '@/types/StudentInterface';
import useStudents from '@/hooks/useStudents';

const Students = (): React.ReactElement => {
  const {  students } = useStudents();

  return (
    <div className={styles.Groups}>
      {students.map((student: StudentInterface) => (
        <h2 key={student.id}>
          {`${student.first_name} ${student.middle_name} ${student.last_name}`}
       
        </h2>
      ))}
    </div>
  );
};

export default Students;
