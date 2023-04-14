import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../config/store';
import { getUser, setUser, destroy as destroySession, validateUser } from '../config/reducers/userSlice';
import { useEffect } from 'react';

/**
 * @returns {object} user
 * @description Hook to handle user session
 */

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const validate = () => {
    dispatch(validateUser());
  }

  const destroy = () => {
    dispatch(destroySession())
  }

  const set = (user: any) => {
    dispatch(setUser(user));
  }

  return {
    user,
    validate,
    destroy,
    set
  }
}