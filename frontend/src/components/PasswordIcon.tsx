interface IProps {
  canSee: boolean;
  setCanSee: (fn: (b: boolean) => boolean) => void;
}

const PasswordIcon = ({ canSee, setCanSee }: IProps) => {
  return (
    <img
      width="25"
      onClick={() => setCanSee((p) => !p)}
      src={
        canSee
          ? "https://www.svgrepo.com/show/359311/eye-closed.svg"
          : "https://www.svgrepo.com/show/87732/black-eye.svg"
      }
      alt="Password"
    />
  );
};

export default PasswordIcon;
