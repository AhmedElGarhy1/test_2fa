import { FC } from "react";

interface IProps {
  image: string;
  callback: () => void;
}

const TwoFaPopup: FC<IProps> = ({ image, callback }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[90%] max-w-[700px] bg-white p-10 ">
        <p>
          In order to protect your account from unauthorized access, we require
          both a password and possession of your phone to access your account.
          Please install Microsoft Authenticator app through the following steps
          for us to verify that you have possession of your phone.
        </p>
        <ol className="list-decimal ps-8 pt-4 text-sm">
          <li>
            Install the Microsoft Authenticator App from IOS App Store/Android
            Play Store.
          </li>
          <li>Open the Microsoft Authenticator App.</li>
          <li>Click I agree for permissions to use the app.</li>
          <li> Click Scan a QR Code</li>
          <li>Scan the image below</li>
        </ol>
        <div className="flex flex-col justify-center items-center">
          <img src={image} alt="QR-Code" />
          <p className="px-8 text-center">
            When Microsoft Authenticator app displays a six-digit code, click
            the <b>Continue</b> button below
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={callback}
            className="bg-green-600 hover:bg-green-700 text-center px-28 py-2 text-lg font-bold text-white  mx-auto mt-6"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFaPopup;
