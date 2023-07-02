import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/");
        }
      });
    }, [auth, router]);

    return <Component {...props} />;
  };
}
