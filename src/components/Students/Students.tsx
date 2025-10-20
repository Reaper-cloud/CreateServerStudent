"use client";

import styles from "./Students.module.scss";
import StudentInterface from "@/types/StudentInterface";
import useStudents from "@/hooks/useStudents";
import Student from "./Student/Student";
import { AddStudentForm } from "./AddStudentForm/AddStudentForm";

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, createStudentMutate } = useStudents();

  return (
    <div className={styles.Groups}>
      <AddStudentForm createStudentMutate={createStudentMutate} />
      <div>
        {students.map((student: StudentInterface, i: number) => (
          <Student key={i} student={student} onDelete={deleteStudentMutate} />
        ))}
      </div>
    </div>
  );
};

export default Students;
