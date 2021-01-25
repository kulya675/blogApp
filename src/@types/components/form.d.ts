export type SignUpFormType = {
  username?: string;
  email?: string;
  password?: string;
  repeat?: string;
};

export type SignInFormType = {
  email?: string;
  password?: string;
};

export type ProfileFormType = {
  username?: string;
  email?: string;
  password?: string;
  image?: string;
};

export type ArticleFormType = {
  title: string;
  description?: string;
  body?: string;
  tagList?: string[];
};

export type FormFieldType<T> = {
  name: T;
  label: string;
  type?: string;
};

// FIXME: Нужно придумать, как использовать правильно тип в этом месте!!

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormErrorType<T = any> = {
  type: string;
  name: T;
  message: string;
};

export type SignUpFieldNameType = 'username' | 'email' | 'password' | 'repeat';
export type SignInFieldNameType = 'email' | 'password';
export type ProfileFieldNameType = 'username' | 'email' | 'password' | 'image';
export type ArticleFormFieldNameType = 'title' | 'description' | 'body' | 'tags';

export type FormFieldNameType = SignInFieldNameType | SignUpFieldNameType | ProfileFieldNameType | ArticleFormType;
