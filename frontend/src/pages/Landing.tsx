import { useAppSelector } from "../store";
import { selectUser } from "../store/slices/authSlice";

const Landing = () => {
  const user = useAppSelector(selectUser);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <div className="p-10">
      <h2>{`Welcome, ${user?.firstName} ${user?.lastName}`}</h2>
      <button
        onClick={logout}
        className="bg-main text-white px-8 py-2 rounded-md mt-5 block text-lg hover:bg-green-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Landing;
