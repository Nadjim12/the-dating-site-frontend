import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}`
        );
        if (response.ok) {
          const userData = await response.json();
          setEvent(userData);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const response = await fetchWithToken(`/users/${userId}`, "DELETE");
      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <>
      <h1>Event Details</h1>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.email}</p>
      <p>{user.social}</p>
      <p>{user.age}</p>
      <p>{user.civilStatus}</p>
      <p>{user.xxxxx}</p>
      <p>{user.xxxxxx}</p>

      <>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
        <Link to={`/users/${user._id}/update`}>Update</Link>
      </>
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default UserPage;
