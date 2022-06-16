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
