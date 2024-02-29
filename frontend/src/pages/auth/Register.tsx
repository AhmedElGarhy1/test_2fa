import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import baseAxios from "../../config/axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const { mutateAsync, isLoading } = useMutation("auth", (data: any) =>
    baseAxios.post("/auth/register", data)
  );

  const signup = () => {
    mutateAsync({ firstName, lastName, email, password }).then((res) => {
      console.log(res.data);
      if (res.status === 201) {
        setShowConfirmation(true);
      }
    });
  };

  return (
    <div className="w-[800px] mx-auto py-20 ">
      <div className="">
        <div className="flex gap-10 pb-5">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="text-lg border rounded-md w-full p-4 border-gray-600"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="text-lg border rounded-md w-full p-4 border-gray-600"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="flex gap-10">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="text-lg border rounded-md w-full p-4 border-gray-600"
            type="email"
            placeholder="Email"
          />
          <div className="w-[105%]">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="text-lg border w-full rounded-md p-4 border-gray-600"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <button
            className="bg-green-600 text-white px-20 py-3 rounded-md mt-5 mx-auto block text-2xl hover:bg-green-700 transition"
            onClick={signup}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
          <div>
            Already have an Account?{" "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-96 bg-white p-10 ">
            <div>
              <h2 className="pb-4 text-2xl">
                Please check your email for confirmation
              </h2>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-green-700 text-white px-12 py-2 text-lg mx-auto block"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
