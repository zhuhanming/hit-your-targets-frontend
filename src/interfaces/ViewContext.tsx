export enum View {
  TODAY = 'TODAY',
  NEXT_SEVEN_DAYS = 'NEXT_SEVEN_DAYS',
  ALL = 'ALL',
  COMPLETED = 'COMPLETED'
}

export default interface ViewContextInterface {
  viewSelected: View;
  updateView: (newView: View) => void;
}
