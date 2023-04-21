import { useState } from "react";

export const useUserBuilder = (predefinedUser = {}) => {
  const [user, setUser] = useState({
    gender: "",
    nationality: "",
    location: "",
    headline: "",
    tags: [],
    careerNeeds: [],
    ...predefinedUser
  });
  return { user, setUser };
};
