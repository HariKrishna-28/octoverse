import { auth, provider } from "../../firebase";

export const signInProvider = () => {
  return auth.signInWithPopup(provider);
  // .then((res) => {
  //   console.log(res);
  // })
  // .catch((err) => {
  //   alert(err.message);
  // });
};

export const signOut = () => {
  auth.signOut();
};
