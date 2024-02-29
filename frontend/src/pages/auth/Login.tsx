import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import PasswordIcon from "../../components/PasswordIcon";
import TwoFaPopup from "../../components/TwoFaPopup";
import baseAxios from "../../config/axios";
import TwoFactor from "./TwoFactor";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [canSeePassword, setCanSeePassword] = useState(false);
  const [twoFaQR, setTwoFaQR] = useState<string>("");
  const [twoFaOtp, setTwoFaOtp] = useState<boolean>(false);

  const { isLoading, mutateAsync } = useMutation("auth", (data: any) =>
    baseAxios.post("/auth/login", data)
  );

  const onOtpFinish = (otp: string) => {
    login(otp);
  };

  const onQRFinish = () => {
    setTwoFaQR("");
    setTwoFaOtp(true);
  };

  const login = (otp?: string) => {
    mutateAsync({ email, password, code: otp }).then((res) => {
      console.log(res.data);
      if (res.status === 201) {
        if (res.data.message === "Please setup 2FA") {
          setTwoFaQR(res.data.imageUrl);
        } else if (res.data.message === "Please add code field") {
          setTwoFaOtp(true);
        } else if (res.data.message === "Successfully Authenticated") {
          localStorage.setItem("accessToken", res.data.accessToken);
          window.location.href = "/landing";
        }
      }
    });
  };

  return (
    <div className="w-[400px] mx-auto pt-32">
      <div className="">
        <div className="flex gap-10 pb-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="text-lg border rounded-md w-full p-4 border-gray-600"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="flex gap-10 relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="text-lg border w-full rounded-md p-4 border-gray-600"
            type={canSeePassword ? "text" : "password"}
            placeholder="Password"
          />
          <span className="absolute right-3 top-4">
            <PasswordIcon
              setCanSee={setCanSeePassword}
              canSee={canSeePassword}
            />
          </span>
        </div>
        <div>
          <button
            className="bg-main text-white w-full py-3 rounded-md mt-5 mx-auto block text-2xl hover:bg-green-700 transition"
            onClick={() => login()}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div>
            Not a member?{" "}
            <Link to="/register" className="text-green-600">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
      {twoFaQR && <TwoFaPopup callback={onQRFinish} image={twoFaQR} />}
      {twoFaOtp && <TwoFactor callback={onOtpFinish} />}
    </div>
  );
};

export default Login;
