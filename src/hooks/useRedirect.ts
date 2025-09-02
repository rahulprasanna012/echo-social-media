import { useNavigate } from "react-router-dom";

export function useRedirect() {
  const navigate = useNavigate();

  // You can accept either a string path or number (for back/forward)
  const redirect = (to: any) => {
    navigate(to);
  };

  return { redirect };
}
