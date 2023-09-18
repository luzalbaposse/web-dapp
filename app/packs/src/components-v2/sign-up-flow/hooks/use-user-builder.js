import { useState } from "react";

export const useUserBuilder = () => {
  const [user, setUser] = useState({
    captcha: "",
    code: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    handle: "",
    gender: "",
    nationality: "",
    location: "",
    headline: "",
    tags: []
  });
  return { user, setUser };
};
