export interface LikeNotificationProps {
  post: {
    img: string;
    id: string;
    desc: string;
  };
  _id: string;
  userEmail: string;
  type: string;
  followerId: string;
  followerEmail: string;
  profilePic: string;
  hasSeen: boolean;
  createdAt: string;
  updatedAt: string;
  followerName: string;
}

export interface FollowNotificationProps {
  _id: string;
  userEmail: string;
  type: string;
  followerId: string;
  followerEmail: string;
  profilePic: string;
  hasSeen: boolean;
  createdAt: string;
  updatedAt: string;
}
