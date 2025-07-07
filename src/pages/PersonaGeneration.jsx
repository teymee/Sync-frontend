import { getAudioFeatures } from "@/features/Logic/logicAPI";
import { songFeatures, personas } from "@/utils/data";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function PersonaGeneration() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAudioFeatures("6VbLBFjsXbH8AP3MIgqB2n"));
  }, [dispatch]);

  // 🚨 PERSONALITY TRAIT

  let features = [
    "valence",
    "energy",
    "danceability",
    "tempo",
    "acousticness",
    "instrumentalness",
    "liveness",
  ];
  let featureAverages = {};

  features.forEach((feature) => {
    const sum = songFeatures.reduce((acc, audio) => acc + audio[feature], 0);
    featureAverages[feature] = sum / songFeatures?.length;
  });

  const getPersonaMatches = (featureAverages, personas, features) => {
    const matches = personas.map((persona) => {
      const rules = Object.entries(persona.rules);
      let matchCount = 0;

      rules.forEach(([key, [high, low]]) => {
        const value = featureAverages[key];
        if (value >= low && value <= high) {
          matchCount++;
        }
      });

      const percentage = (matchCount / features.length) * 100;

      return {
        name: persona.name,
        shortHand: persona.shortHand,
        matchCount,
        percentage: Math.round(percentage),
      };
    });

    return matches.sort((a, b) => b.percentage - a.percentage);
  };

  const personalityTraits = getPersonaMatches(
    featureAverages,
    personas,
    features
  );
  const topPersona = personalityTraits[0];

  const leastPersona = personalityTraits[personalityTraits?.length - 1];

  ///////
  return (
    <>
      <div>
        Top persona : {topPersona?.name} {topPersona?.percentage}%
      </div>
      <div>
        Least persona : {leastPersona?.name} {leastPersona?.percentage}%
      </div>
    </>
  );
}
