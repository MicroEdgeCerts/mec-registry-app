import { useState, useEffect, useRef } from "react";
import { AchievementCredeintialFormType } from "@/types"
import FileUpload from '@/components/FileUpload'
import { maxSizeMB } from "@/config";
import { useTranslation } from "@/context/LocalizedContext"
import AchievementTypesSelector, { selection as achievementSelections} from "@/components/AddCourse/AchievementTypesSelector"
interface AddCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCourse: (course: AchievementCredeintialFormType) => void;
}

const defaultFormData: AchievementCredeintialFormType = {
    key_sets: [],
    achievement_type: achievementSelections[0],
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
  const { t } = useTranslation();

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

  const setAchievement = (achievement_type:string) => {
    setFormValues({
      ...formValues,
      achievement_type,
    })
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
      <div ref={dialogRef} className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl animate-fadeIn">
        <h2 className="text-2xl mb-4">{t("skill.addSkillTitle","Add New Course")}</h2>
        {step === 0 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name_en">{ t("skill.course.NameEn","Course Name (English)")}</label>
              <input
                className="w-full px-3 py-2 border rounded"
                id="name_en"
                type="text"
                name="name_en"
                value={formValues.name_en}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name_ja">{ t("skill.course.NameJa","Course Name (Japanese)")}</label>
              <input
                className="w-full px-3 py-2 border rounded"
                id="name_ja"
                type="text"
                name="name_ja"
                value={formValues.name_ja}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="url">{ t("skill.course.website","Website")}</label>
              <input
                className="w-full px-3 py-2 border rounded"
                id="url"
                type="text"
                name="url"
                value={formValues.url}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">{ t("skill.course.achievementType","AchievementType")}</label>
              <AchievementTypesSelector onSelect={ setAchievement } />
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="description_en">{ t("skill.course.descriptionEn","Description (English)")}</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                id="description_en"
                name="description_en"
                value={formValues.description_en}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="description_ja">{ t("skill.course.descriptionJa","Description (Japanese)")}</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                id="description_ja"
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
              <label className="block text-sm font-bold mb-2" >{ t("skill.course.image","Image")}</label>
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
              <label className="block text-sm font-bold mb-2" htmlFor="key_sets">{ t("skill.course.publicKeys","Public Keys")}</label>
              <textarea
                id="key_sets"
                className="w-full px-3 py-2 border rounded"
                name="key_sets"
                value={formValues.key_sets.join(',')}
                onChange={(e) => setFormValues({ ...formValues, key_sets: e.target.value.split(',') })}
              />
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold mb-4">{ t("skill.course.ConfirmDetail","Confirm Your Course Details")}</h3>
            <p className="mb-2"><strong>{ t("skill.course.NameEn","Course Name (English)")}:</strong> {formValues.name_en}</p>
            <p className="mb-2"><strong>{ t("skill.course.NameJa","Course Name (Japanese)")}:</strong> {formValues.name_ja}</p>
            <p className="mb-2"><strong>{ t("skill.course.website","Website")}:</strong> {formValues.url}</p>
            <p className="mb-2"><strong>{ t("skill.course.descriptionEn","Description (English)")}:</strong> {formValues.description_en}</p>
            <p className="mb-2"><strong>{ t("skill.course.descriptionJa","Description (Japanese)")}:</strong> {formValues.description_ja}</p>
            <p className="mb-2"><strong>{ t("skill.course.achievementType","AchievementType")}:</strong> {formValues.achievement_type}</p>
            {formValues.image && <img src={formValues.image} alt="Uploaded" className="w-32 h-32 object-cover mb-4" />}
          </div>
        )}
        <div className="flex justify-between mt-4">
          {step > 0 && <button onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded">Back</button>}
          {step < 4 && <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>}
          {step === 4 && <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>}
        </div>

      </div>
    </div>
  );
};


export default AddCourseDialog;