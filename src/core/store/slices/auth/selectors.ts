import { RootState } from '../../store';

const authSelectors = {
  loggedIn: (state: RootState) => state.auth.isLoggedIn,
  user: (state: RootState) => state.auth.user,
};

export default authSelectors;
