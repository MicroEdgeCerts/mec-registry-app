import React, { useState } from 'react';
import { useTranslation } from '@/context/LocalizedContext'

export const selection = [
  "Achievement",
  "ApprenticeshipCertificate",
  "Assessment",
  "Assignment",
  "AssociateDegree",
  "Award",
  "Badge",
  "BachelorDegree",
  "Certificate",
  "CertificateOfCompletion",
  "Certification",
  "CommunityService",
  "Competency",
  "Course",
  "CoCurricular",
  "Degree",
  "Diploma",
  "DoctoralDegree",
  "Fieldwork",
  "GeneralEducationDevelopment",
  "JourneymanCertificate",
  "LearningProgram",
  "License",
  "Membership",
  "ProfessionalDoctorate",
  "QualityAssuranceCredential",
  "MasterCertificate",
  "MasterDegree",
  "MicroCredential",
  "ResearchDoctorate",
  "SecondarySchoolDiploma"
];

type Props = {
  onSelect: (selectedOption: string) => void;
};

const AchievementTypesSelector: React.FC<Props> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { t } = useTranslation()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {t(`achievement.type.Select`,'Select a Credential Type')}
      </label>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={selectedOption}
        onChange={handleChange}
      >
        {selection.map((item) => (
          <option key={item} value={item}>
            {t(`achievement.type.${item}`,item)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AchievementTypesSelector;
