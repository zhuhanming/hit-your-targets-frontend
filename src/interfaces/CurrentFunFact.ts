import { FunFact } from 'utils/funFactUtils';

export default interface CurrentFunFact {
  fact: FunFact | null;
  lastUpdated: Date | null;
}
