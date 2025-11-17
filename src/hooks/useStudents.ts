import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStudentApi,
  deleteStudentApi,
  getStudentsApi,
} from "@/api/studentsApi";
import StudentInterface from "@/types/StudentInterface";
import CreateStudentDto from "@/dto/CreateStudentDto";

interface StudentsHookInterface {
  students: StudentInterface[];
  isLoading: boolean;
  getStudentById: (studentId: string) => StudentInterface | undefined;
  deleteStudentMutate: (studentId: number) => void;
  createStudentMutate: (dto: CreateStudentDto) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () => getStudentsApi(),
    enabled: true, // Изменено на true для автоматической загрузки
  });

  /**
   * Получить студента по ID
   */
  const getStudentById = (studentId: string): StudentInterface | undefined => {
    const students = data ?? [];
    return students.find(student => student.id.toString() === studentId);
  };

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    mutationFn: async (studentId: number) => await deleteStudentApi(studentId),
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>([
        "students",
      ]);
      let updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      
      queryClient.setQueryData<StudentInterface[]>(
        ["students"],
        updatedStudents
      );

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log(">>> deleteStudentMutate  err", err);
      queryClient.setQueryData<StudentInterface[]>(
        ["students"],
        context?.previousStudents
      );
    },
    onSuccess: async (studentId, variables, context) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      
      if (!context?.previousStudents) {
        return;
      }
      const updatedStudents = context.previousStudents.filter(
        (student: StudentInterface) => student.id !== studentId
      );
      queryClient.setQueryData<StudentInterface[]>(
        ["students"],
        updatedStudents
      );
    },
  });

  /**
   * Мутация создания студента
   */
  const createStudentMutate = useMutation({
    mutationFn: async (dto: CreateStudentDto) => await createStudentApi(dto),
    onMutate: async (newStudentDto: CreateStudentDto) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>([
        "students",
      ]);
      const tempId = Date.now() * -1;
      const optimisticStudent: StudentInterface = {
        id: tempId,
        isCreating: true,
        ...newStudentDto,
      };

      queryClient.setQueryData<StudentInterface[]>(
        ["students"],
        (oldStudents) => [...(oldStudents ?? []), optimisticStudent]
      );
      return { previousStudents, optimisticStudent };
    },
    onError: (err, variables, context) => {
      console.log(">>> createStudentMutate onError", err);
      queryClient.setQueryData<StudentInterface[]>(
        ["students"],
        context?.previousStudents
      );
    },
    onSuccess: async (createdStudent, variables, context) => {
      if (!createdStudent) {
        queryClient.setQueryData<StudentInterface[]>(
          ["students"],
          (oldStudents) =>
            oldStudents?.filter(
              (student) => student.id !== context?.optimisticStudent.id
            )
        );
        return;
      }
      await queryClient.cancelQueries({ queryKey: ["students"] });
      queryClient.setQueryData<StudentInterface[]>(
        ["students"],
        (oldStudents) =>
          oldStudents?.map((student) =>
            student.id === context?.optimisticStudent.id
              ? createdStudent
              : student
          )
      );
    },
  });

  return {
    students: data ?? [],
    isLoading,
    getStudentById,
    deleteStudentMutate: deleteStudentMutate.mutate,
    createStudentMutate: createStudentMutate.mutate,
  };
};

export default useStudents;