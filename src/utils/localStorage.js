// functionality for the local storage
// to keep the user once logged in
// when we refresh the page

export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  // either the user is there or not
  const user = result ? JSON.parse(result) : null;
  return user;
};
