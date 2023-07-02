import { useEffect } from "react";
import { useRouter } from "next/router";

export default function withAuth(Component) {
    return function ProtectedRoute(props) {
      const router = useRouter();
  
      useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
          router.push("/");
        }
      }, []);
  
      return <Component {...props} />;
    };
  }