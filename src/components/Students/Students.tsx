"use client";

import styles from "./Students.module.scss";
import StudentInterface from "@/types/StudentInterface";
import useStudents from "@/hooks/useStudents";
import Student from "./Student/Student";
import { AddStudentForm } from "./AddStudentForm/AddStudentForm";
import Link from "next/link";

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, createStudentMutate } = useStudents();

  return (
    <div className={styles.Students}>
      <AddStudentForm createStudentMutate={createStudentMutate} />
      <div className={styles.studentsList}>
        {students.map((student: StudentInterface, i: number) => (
          <Link 
            key={i} 
            href={`/students/${student.id}`}
            className={styles.studentLink}
          >
            <Student student={student} onDelete={deleteStudentMutate} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Students;