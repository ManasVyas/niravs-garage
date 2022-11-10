import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../api/userApi";

export const UserView = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h2>List of Users</h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error && <div>Error: {user.error}</div>}
      {!user.loading && user.users.length && (
        <ul>
          {user.users.map((user) => (
            <li key={user._id}>{user.userName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
