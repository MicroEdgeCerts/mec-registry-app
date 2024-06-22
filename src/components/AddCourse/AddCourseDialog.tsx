import { useState, useEffect, useRef } from "react";
import { AchievementCredeintialFormType } from "@/types"
import FileUpload from '@/components/FileUpload'
import { maxSizeMB } from "@/config";

interface AddCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCourse: (course: AchievementCredeintialFormType) => void;
}

const defaultFormData: AchievementCredeintialFormType = {
    key_sets: [],
    revoked_key_sets: [],
    cannonical_id: '',
    profile_id: '',
    name_en: '',
    name_ja: '',
    description_en: '',
    description_ja: '',
    url: '',
  }

const AddCourseDialog: React.FC<AddCourseDialogProps> = ({ open, onClose, onAddCourse }) => {
  const [step, setStep] = useState<number>(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [formValues, setFormValues] = useState<AchievementCredeintialFormType>(defaultFormData);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleImageChange = ( image: string | null ) => {
    setFormValues({ ...formValues, image: image||'' });
  };

  const handleSubmit = () => {
    onAddCourse(formValues);
    processClose();
  };

  const resetValue = () => {
    setStep(0)
    setFormValues( defaultFormData )
  }

  const processClose = ()=> {
    onClose();
  }

  useEffect(()=> {
    if( open ) {
      /* you clear value before it's open */
      resetValue();
    }
  }, [open])


  const handleClickOutside = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      processClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);



  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div ref={dialogRef} className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl animate-fadeIn">
        <h2 className="text-2xl mb-4">Add New Course</h2>
        {step === 0 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name_en">Course Name (English)</label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                name="name_en"
                value={formValues.name_en}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name_en">Course Name (Japanese)</label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                name="name_ja"
                value={formValues.name_ja}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="url">Website</label>
              <input
                className="w-full px-3 py-2 border rounded"
                type="text"
                name="url"
                value={formValues.url}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="description_en">Description (English)</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                name="description_en"
                value={formValues.description_en}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="description_en">Description (Japanese)</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                name="description_ja"
                value={formValues.description_ja}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="image">Image URL</label>
              <FileUpload 
                image={formValues.image || ''}
                onChange={ handleImageChange }
                maxSizeMB={maxSizeMB}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="key_sets">Public Keys</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                name="key_sets"
                value={formValues.key_sets.join(',')}
                onChange={(e) => setFormValues({ ...formValues, key_sets: e.target.value.split(',') })}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          {step > 0 && <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded">Back</button>}
          {step < 3 && <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>}
          {step === 3 && <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>}
        </div>
      </div>
    </div>
  );
};


export default AddCourseDialog;