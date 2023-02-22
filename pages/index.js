import UserForm from '../components/user/UserForm';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      {user && !user.id ? (
        <UserForm user={user} />
      ) : ('')}
    </div>
  );
}

export default Home;
