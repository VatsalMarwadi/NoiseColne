// LocalStorage keys for auth (gonoise-style)
const USERS_KEY = 'noise_users';
const CURRENT_USER_KEY = 'noise_currentUser';

export const getUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveUser = (user) => {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    return { success: false, error: 'An account with this email already exists.' };
  }
  users.push({ name: user.name, email: user.email, password: user.password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const signIn = (email, password) => {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return { success: false, error: 'No account found with this email.' };
  if (user.password !== password) return { success: false, error: 'Incorrect password.' };
  const currentUser = { name: user.name, email: user.email };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  return { success: true, user: currentUser };
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const signOut = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
