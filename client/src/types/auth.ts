export type SignupFormTypes = {
  email: string;
  password: string;
  bio:string
};

export type SignupFormErrorTypes = {
  emailErr?: string;
  passwordErr?: string;
  bioErr?:string
};

export type SignupData= &{

    profile:string
}