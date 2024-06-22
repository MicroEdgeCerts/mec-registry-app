import { useState, useEffect } from 'react'
import EditIcon from "@/components/icons/EditIcon"; // Tailwind Hero Icons
import iconStyles from "@/components/icons/icon.module.scss";
import { useCourseContext } from "@/context/AchievementCredentialRegistryContext" 
import AddCourses from '@/components/AddCourse'
import Loading from '@/components/Loading'
import { maxProfileSizeBytes, maxSizeMB } from "@/config";
interface CourseCard {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default ()=> {
  const [ courses, setCourses] = useState<CourseCard[]>([]);
  const [ state, action ] = useCourseContext();

  useEffect(() => {
    // Fetch NFTs (you can replace this with your own API call)
    // const fetchCourses = async () => {
    //   const response = await axios.get('/api/nfts'); // Example API call
    //   setCourses(response.data);
    // };
    //fetchCourses();
  }, []);


  if( !state.initialized ){
    return <Loading />
  } 

  if ( state.currentProfile === null ){
        return <></>
  } 

  if ( courses.length == 0 ) {
    return <AddCourses />
  }

  return <>
   { courses.length == 0 && 
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Contract</h1>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`${iconStyles.icon}`}
      >
        <EditIcon strokeColor={"#64748b"} className="h-6 w-6 text-gray-500" />
      </button>
    </div>
  }

  {courses.map((course) => (
    <div key={course.id} className="border rounded-lg overflow-hidden shadow-lg p-4">
      <img src={course.image} alt={course.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-bold">{course.name}</h3>
      <p className="text-gray-600">{course.description}</p>
    </div>
  ))}
  </>


}