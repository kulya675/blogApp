export type ArticleHeaderPropsType = {
  username: string;
  title: string;
  favorited: boolean;
  favoritesCount: number;
  image: string;
  date: string;
  description: string;
  slug: string;
  tags: React.ReactElement[];
  owner?: boolean;
};

export type ArticleBodyPropsType = {
  body: string;
};

export type ArticleContainerPropsType = ArticleHeaderPropsType & ArticleBodyPropsType & { isSlug?: boolean };
