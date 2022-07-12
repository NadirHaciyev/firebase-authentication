import { useAuth } from "../context/authContext";

function Profile() {
  const { user } = useAuth();

  return (
    <>
      <div className="text-red-500 text-3xl font-bold">Profile</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export default Profile;
