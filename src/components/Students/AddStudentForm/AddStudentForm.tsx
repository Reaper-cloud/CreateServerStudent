import React from 'react';
import { useForm } from 'react-hook-form';
import CreateStudentDto from '@/dto/CreateStudentDto';
import styles from './AddStudentForm.module.scss';

interface StudentCreatorFormProps {
  createStudentMutate: (dto: CreateStudentDto) => void;
}

export const AddStudentForm = ({ createStudentMutate }: StudentCreatorFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStudentDto>();

  const onSubmit = (data: CreateStudentDto) => {
    createStudentMutate(data);
    reset();
  };

  return (
    <div className={styles.Form}>
      <h3>Добавить нового студента</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.FormGroup}>
          <label>Имя:</label>
          <input
            className={errors.firstName ? styles.error : ''}
            {...register('firstName', { 
              required: 'Имя обязательно',
              minLength: { value: 2, message: 'Имя должно содержать минимум 2 символа' },
              maxLength: { value: 50, message: 'Имя не должно превышать 50 символов' },
              pattern: { value: /^[А-Яа-яЁёA-Za-z\s-]+$/, message: 'Имя может содержать только буквы, пробелы и дефисы' }
            })}
            placeholder="Введите имя"
          />
          {errors.firstName && <span className={styles.ErrorMessage}>{errors.firstName.message}</span>}
        </div>

        <div className={styles.FormGroup}>
          <label>Фамилия:</label>
          <input
            className={errors.lastName ? styles.error : ''}
            {...register('lastName', { 
              required: 'Фамилия обязательна',
              minLength: { value: 2, message: 'Фамилия должна содержать минимум 2 символа' },
              maxLength: { value: 50, message: 'Фамилия не должна превышать 50 символов' },
              pattern: { value: /^[А-Яа-яЁёA-Za-z\s-]+$/, message: 'Фамилия может содержать только буквы, пробелы и дефисы' }
            })}
            placeholder="Введите фамилию"
          />
          {errors.lastName && <span className={styles.ErrorMessage}>{errors.lastName.message}</span>}
        </div>

        <div className={styles.FormGroup}>
          <label>Отчество:</label>
          <input
            className={errors.middleName ? styles.error : ''}
            {...register('middleName', {
              minLength: { value: 2, message: 'Отчество должно содержать минимум 2 символа' },
              maxLength: { value: 50, message: 'Отчество не должно превышать 50 символов' },
              pattern: { value: /^[А-Яа-яЁёA-Za-z\s-]*$/, message: 'Отчество может содержать только буквы, пробелы и дефисы' }
            })}
            placeholder="Введите отчество (необязательно)"
          />
          {errors.middleName && <span className={styles.ErrorMessage}>{errors.middleName.message}</span>}
        </div>

        <div className={styles.FormGroup}>
          <label>ID Группы:</label>
          <input
            type="number"
            className={errors.groupId ? styles.error : ''}
            {...register('groupId', {
              required: 'ID группы обязателен',
              valueAsNumber: true,
              min: { value: 1, message: 'ID группы должен быть не менее 1' },
              max: { value: 9999, message: 'ID группы не должен превышать 9999' }
            })}
            placeholder="Введите ID группы"
          />
          {errors.groupId && <span className={styles.ErrorMessage}>{errors.groupId.message}</span>}
        </div>

        <button type="submit" className={styles.SubmitButton}>
          Добавить студента
        </button>
      </form>
    </div>
  );
};