/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import UserForm from '../../../components/user/UserForm';
import { getSingleUser } from '../../../utils/data/userData';
import { useAuth } from '../../../utils/context/authContext';

export default function EditUser() {
  const [user, setUser] = useState({});
  const { onUpdate, authUpdateUser } = useAuth();
  const router = useRouter();
  const { userId } = router.query;

  const getTheUser = () => {
    getSingleUser(userId).then(setUser);
  };

  useEffect(() => {
    getTheUser();
  }, [router]);

  return (
    <div>
      <UserForm user={user} onUpdate={onUpdate} authUpdateUser={authUpdateUser} />
    </div>
  );
}
