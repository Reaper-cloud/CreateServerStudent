interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
  isDeleted?: boolean;
  isCreating?: boolean;
  birthDate?: Date;
  email?: string;
  phone?: number;
  enrollmentDate?: Date;
  status?: string;
  address?: string;
  notes?: string;
}

export default StudentInterface;
