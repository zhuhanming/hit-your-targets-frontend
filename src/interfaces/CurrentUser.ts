import Preferences from './Preferences';

export default interface CurrentUser {
  name: string | null;
  email: string | null;
  displayImageUrl: string | null;
  lastRetrieved: Date | null;
  preferences: Preferences | null;
}
