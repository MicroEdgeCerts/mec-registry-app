import React, { useState } from 'react';

const Registry: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Name submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 bg-gray-100 rounded shadow-md">
      <label htmlFor="name" className="mb-2 text-lg font-semibold text-gray-700">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Submit
      </button>
    </form>
  );
};

export default Registry;
