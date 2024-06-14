import React from 'react';
import AddButton from './AddButton';

type AddIssuerProp = {
  onClick: ()=> void
}
const AddIssuer: React.FC<AddIssuerProp> = ({onClick}) => {
  return (
    <div className="flex items-center space-x-4">
      <AddButton width={100} height={100} onClick={onClick} />
      <label className="text-lg font-medium">Add Issuer Profile</label>
    </div>

  );
};

export default AddIssuer;
