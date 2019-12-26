import SubToDo from 'interfaces/SubToDo';

export default interface ToDo {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  tags: string[];
  completed: boolean;
  subToDos: SubToDo;
}
