import { useNavigate } from "react-router-dom";

export function useRedirect() {
  const navigate = useNavigate();

  // You can accept either a string path or number (for back/forward)
  const redirect = (to?: string | number) => {
    if (typeof to === "string") {
      navigate(to);
    } else if (typeof to === "number") {
      navigate(to);
    }
    // If 'to' is undefined, do nothing
  };

  return { redirect };
}
