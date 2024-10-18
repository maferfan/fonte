export interface IAccount {
  name: string,
  id: number,
  email: string,
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface Gravatar {
  hash: string;
}

export interface Tmdb {
  avatar_path: any;
}
