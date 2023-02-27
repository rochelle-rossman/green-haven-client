import React from 'react';
import UserInfoCard from '../../components/user/UserInfoCard';
import { useAuth } from '../../utils/context/authContext';

export default function UserView() {
  const { user } = useAuth();

  return (
    <div className="userView">
      <div className="userInfoCard-orderHistory-container">
        <UserInfoCard className="userInfoCard" userObj={user} />
      </div>
    </div>
  );
}
