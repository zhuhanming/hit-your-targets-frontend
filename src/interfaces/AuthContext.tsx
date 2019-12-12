import UserContextInterface from 'interfaces/UserContext';

interface AuthContextInterface {
  data: UserContextInterface;
  login(): Promise<any>;
  logout(): Promise<void>;
}

export default AuthContextInterface;