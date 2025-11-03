import CreateStudentDto from "@/dto/CreateStudentDto";
import StudentInterface from "@/types/StudentInterface";

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const groups = (await response.json()) as StudentInterface[];
    return groups;
  } catch (err) {
    console.log(">>> getStudentsApi", err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}students/${studentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  } catch (err) {
    console.log(">>> deleteStudentApi", err);
    return -1;
  }
};

export const createStudentApi = async (
  dto: CreateStudentDto
): Promise<StudentInterface | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.log(">>> createStudentApi", err);
    return null;
  }
};
