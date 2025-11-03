import sqlite3 from "sqlite3";

import type StudentInterface from "@/types/StudentInterface";
import getRandomFio from "@/utils/getRandomFio";
import FioInterface from "@/types/FioInterface";
import CreateStudentDto from "@/dto/CreateStudentDto";

sqlite3.verbose();

/**
 * Получение студентов
 * @returns Promise<StudentInterface[]>
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const students = await new Promise((resolve, reject) => {
    const sql = "SELECT * FROM student";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });

  return students as StudentInterface[];
};

export const createStudentDb = async (
  dto: CreateStudentDto
): Promise<StudentInterface | null> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  try {
    const studentId = await new Promise<number>((resolve, reject) => {
      const insertSql = `
        INSERT INTO student (firstName, lastName, middleName, groupId)
        VALUES (?, ?, ?, ?)
      `;
      const params = [dto.firstName, dto.lastName, dto.middleName, dto.groupId];

      db.run(insertSql, params, function (err) {
        if (err) {
          console.error("Ошибка при вставке студента:", err.message);
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });

    const createdStudent = await new Promise<StudentInterface | null>(
      (resolve, reject) => {
        const selectSql = `
        SELECT id, firstName, lastName, middleName, groupId FROM student
        WHERE id = ?
      `;

        db.get(selectSql, [studentId], (err, row: StudentInterface) => {
          if (err) {
            console.error(
              "Ошибка при получении созданного студента:",
              err.message
            );
            reject(err);
            return;
          }
          if (row) {
            resolve(row);
          } else {
            console.warn(
              `Не удалось найти студента с ID ${studentId} после успешной вставки.`
            );
            resolve(null);
          }
        });
      }
    );

    return createdStudent;
  } catch (error) {
    console.error(">>> createStudentDb", error);
    return null; // В случае любой ошибки возвращаем null
  } finally {
    db.close(); // Всегда закрываем базу данных
  }
};

/**
 * Удаления студента
 * @param studentId
 * @returns
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  await new Promise((resolve, reject) => {
    db.run("DELETE FROM student WHERE id=?", [studentId], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(studentId);
      db.close();
    });
  });

  return studentId;
};

/**
 * Добавление  рандомных студента
 * @param mount количество добавляемых записей - 10 по умолчанию
 * @returns
 */
export const addRandomStudentsDb = async (
  amount: number = 10
): Promise<FioInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const fios: FioInterface[] = [];
  let fiosInsert: string = "";
  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    fios.push(fio);
    fiosInsert += `('${fio.firstName}', '${fio.lastName}', '${fio.middleName}', 1)`;
    fiosInsert += `${i === amount - 1 ? ";" : ","}`;
  }

  await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO student (firstName, lastName, middleName, groupId) VALUES ${fiosInsert}`,
      [],
      (err) => {
        if (err) {
          reject(err);
          db.close();
          return;
        }
        resolve(fios);
        db.close();
      }
    );
  });

  return fios;
};
