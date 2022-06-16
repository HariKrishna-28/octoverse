export interface userProp {
  _id: string;
  userName: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  followers: [];
  following: [];
  isAdmin: boolean;
  description: string;
  city: string;
  from: string;
  createdAt: string;
  // __v: number
}
