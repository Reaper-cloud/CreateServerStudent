interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
  isDeleted?: boolean;
  isCreating?: boolean;
}

export default StudentInterface;
