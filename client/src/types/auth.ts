// types/auth.ts
export type SignupFormTypes = {
  name: string;
  email: string;
  username: string;
  password: string;
  bio?: string;
};

export type SignupDTO = SignupFormTypes & {
  profile?: File|null; 
};
