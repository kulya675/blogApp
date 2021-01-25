export type ArticleType = {
  author: {
    username: string;
    image: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array<string>;
  title: string;
};

export type ArticlesResponseType = {
  articles: Array<ArticleType>;
  articlesCount: number;
};

export type SlugResponseType = {
  article: ArticleType;
};

export type SignUpResponseType = {
  user: {
    username: string;
    email: string;
    password: string;
    image: string;
  };
};

export type SignInResponseType = {
  user: {
    email: string;
    password: string;
  };
};

export type UserResponseType = {
  user: {
    email: string;
    token: string;
    username: string;
    image: string;
  };
};

export type ServerValidationErrorsType = {
  errors: {
    email: Array<string>;
    username: Array<string>;
    password: Array<string>;
  };
};
