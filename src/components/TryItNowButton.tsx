import { useAuth, useModalStore } from "@/store";
import { useRouter } from "next/router";

export default function TryItNowButton({ className }: { className?: string }) {
  const { setRegisterModalIsOpen } = useModalStore();
  const { user } = useAuth();
  const router = useRouter();

  function clickHandler() {
    if (user) return router.push("/profile");
    setRegisterModalIsOpen(true);
  }
  return (
    <button className={className} onClick={clickHandler}>
      Try it now for free!
    </button>
  );
}
