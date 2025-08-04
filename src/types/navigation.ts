import { Article } from './article';

export type RootStackParamList = {
  MainTabs: undefined;
  ArticleDetail: { article: Article };
};

export type TabParamList = {
  News: undefined;
  Saved: undefined;
};