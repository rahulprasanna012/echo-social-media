export type PublicUser = {
  _id: string;
  name: string;
  username: string;
  email?: string;
  profile?: string;
  cover_image?: string;
  followers?: string[];
  following?: string[];
  createdAt?: string;
  postsCount?: number;
};
