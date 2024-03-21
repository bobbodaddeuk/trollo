import { SetMetadata } from '@nestjs/common';
import { MemberGrade } from 'src/member/type/grade.type';

export const GRADES_KEY = 'grades';
export const Grades = (...grades: MemberGrade[]) =>
  SetMetadata(GRADES_KEY, grades);
