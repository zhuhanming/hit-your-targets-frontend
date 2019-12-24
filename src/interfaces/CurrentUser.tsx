export default interface CurrentUser {
  name: string | null;
  email: string | null;
  displayImageUrl: string | null;
  lastRetrieved: Date | null;
}
