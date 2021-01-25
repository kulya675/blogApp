import type { ArticleType } from '../service/response';
import type { UserType } from '../redux/store';
import type { ArticleContainerPropsType } from '../components/components';

export type ArticleCreatorType = (article: ArticleType, isSlug: boolean, user: UserType | null) => React.ReactElement;

export type TransformArticleDataType = (data: ArticleType) => ArticleContainerPropsType;

export type TextReductionType = (target: string, limit: number) => string;
