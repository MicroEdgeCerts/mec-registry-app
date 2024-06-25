import React from 'react'
import { SkillItem } from '@/types'
import { getLocalizedString } from '@/context/LocalizedContext'
import AccountIcon from "@/components/icons/AddIcon"

type SkillCardPropType = {
  skill:SkillItem
  onAddCredential: (skill: SkillItem) => void
}

const getRandomGradient = ( index: number ) => {
  const colors = [
    'from-purple-400 to-blue-500',
    'from-green-400 to-blue-500',
    'from-orange-400 to-pink-500',
    'from-teal-400 to-green-500',
  ];
  return colors[(index % colors.length)];
};


const SkillCard: React.FC<SkillCardPropType> = ( {skill, onAddCredential} ) => {

  const onGenerateCertification = ()=> {
    onAddCredential(skill);
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col min-w-full sm:min-w-0">
      <div className={`relative bg-gradient-to-r ${getRandomGradient(skill.id)} p-4 text-white flex flex-col items-center`}>
        {skill.image && <img src={skill.image} alt={skill.name} className="w-16 h-16 object-cover rounded-full mb-4" />}
        <h2 className="text-xl font-bold mb-2 text-center">{getLocalizedString(skill, "name", "en-US")}</h2>
        <button onClick={onGenerateCertification}　className="absolute bottom-4 right-4 bg-white text-gray-800 p-2 rounded-full shadow-md hover:text-secondary-hover">
          <AccountIcon className={"stroke-current  text-secondary hover:text-secondary-hover"} strokeColor={'currentColor'}/>
        </button>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-2">{getLocalizedString(skill, "description", "en-US")}</p>
        <span>web: <a href={skill.url} className="text-blue-500 mt-2 inline-block break-all">{skill.url}</a></span>
      </div>
    </div>
  );
}

export default React.memo( SkillCard );