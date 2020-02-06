import SubToDo from 'interfaces/SubToDo';

export default interface ToDo {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  completeTime: string;
  tags: string[];
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  subtodos: SubToDo[];
}
