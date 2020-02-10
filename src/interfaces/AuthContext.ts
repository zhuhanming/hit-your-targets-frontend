import UserContextInterface from 'interfaces/UserContext';

export type SignupCode = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginCode = {
  email: string;
  password: string;
};

export default interface AuthContextInterface {
  data: UserContextInterface;
  signup(code: SignupCode): Promise<void>;
  login(code: LoginCode): Promise<void>;
  logout(): Promise<void>;
}
