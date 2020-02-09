export default interface UserContextInterface {
  name: string;
  email: string;
  displayImageUrl: string;
  preferences: {
    clearTaskOnChange: boolean;
    includeCompletedInAll: boolean;
    followKanbanSubtaskOrder: boolean;
  };
}
