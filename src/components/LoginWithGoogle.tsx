import Button from "@/components/Button";
import altogic from "@/libs/altogic";
import { FcGoogle } from "react-icons/fc";

export default function LoginWithGoogle() {
  return (
    <Button
      variant="white"
      type="button"
      className="gap-2"
      onClick={() => altogic.auth.signInWithProvider("google")}
    >
      <FcGoogle size={25} />
      <span>Sign in with Google</span>
    </Button>
  );
}
