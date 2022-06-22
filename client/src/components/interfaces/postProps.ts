export interface postProps {
  post: {
    _id: number;
    userId: string;
    desc?: string;
    img?: string;
    likes: [];
    updatedAt: string;
    createdAt: string;
    // photo: string,
    // date: string,
    // comment: number,
  };
}

export interface uploadPostProps {
  // post: {
  userId: string;
  userEmail: string;
  desc: string;
  img: string;
  // };
}
