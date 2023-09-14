import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styled";
import { ExperiencesComponent } from "src/components-v2/experiences-component";
import { AddExperienceForm } from "./add-form";

export const ExperienceForm = ({ username, setIsDirty }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({});
  const openAddExperienceScreen = useCallback(
    (type, experience) => {
      setIsAdding(type);
      if (experience) setCurrentExperience(experience);
    },
    [setIsAdding, setCurrentExperience]
  );
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  return (
    <Container>
      {!isAdding && (
        <ExperiencesComponent username={username} isOwner openAddExperienceScreen={openAddExperienceScreen} />
      )}
      {!isLoading && isAdding && (
        <AddExperienceForm
          category={isAdding}
          milestone={currentExperience}
          username={username}
          backCallback={() => {
            setCurrentExperience({});
            setIsAdding(false);
          }}
        />
      )}
    </Container>
  );
};
