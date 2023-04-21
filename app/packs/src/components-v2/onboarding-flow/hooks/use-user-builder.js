import { useState } from "react";

export const useUserBuilder = () => {
  const [user, setUser] = useState({
    gender: "",
    nationality: "",
    location: "",
    headline: "",
    tags: [],
    careerNeeds: []
  });
  return { user, setUser };
};
