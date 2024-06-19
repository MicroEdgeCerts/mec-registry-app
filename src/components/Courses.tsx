import { useState, useEffect } from "react";
import axios from "axios";

interface CourseCard {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default () => {
  const [courses, setCourses] = useState<CourseCard[]>([]);
  useEffect(() => {
    // Fetch NFTs (you can replace this with your own API call)
    const fetchCourses = async () => {
      const response = await axios.get("/api/nfts"); // Example API call
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  return (
    <>
      {courses.map((course) => (
        <div
          key={course.id}
          className="border rounded-lg overflow-hidden shadow-lg p-4"
        >
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="text-lg font-bold">{course.name}</h3>
          <p className="text-gray-600">{course.description}</p>
        </div>
      ))}
    </>
  );
};
