import React, { useState, useEffect, useRef } from 'react';
import { RecipientProfileFormType, CredentialCertificateFormType, LocalizedString} from '@/types';
import DatePicker from 'react-datepicker';
import { useTranslation } from "@/context/LocalizedContext"
import 'react-datepicker/dist/react-datepicker.css';

interface AddCredentialDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit:  (profile: RecipientProfileFormType, certificate: CredentialCertificateFormType, privateKey: string) => void;
}

const defaultProfileFormData: RecipientProfileFormType = {
  id: '',
  familyName: { default: '', localized: { 'ja-JP': '' } },
  familyNamePrefix: { default: '', localized: { 'ja-JP': '' } },
  firstName: { default: '', localized: { 'ja-JP': '' } }
};

const defaultCertificateFormData: CredentialCertificateFormType = {
  id: '',
  activityStartDate: 0,
  activityEndDate: 0,
  validFrom: undefined,
  validTo: undefined,
  criteria: '',
  awardedDate: 0
};

export const AddCredentialToLearnerDialog: React.FC<AddCredentialDialogProps> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [profileFormValues, setProfileFormValues] = useState<RecipientProfileFormType>(defaultProfileFormData);
  const [certificateFormValues, setCertificateFormValues] = useState<CredentialCertificateFormType>(defaultCertificateFormData);
  const [privateKey, setPrivateKey] = useState<string>('');
  const [showExpiration, setShowExpiration] = useState<boolean>(false);
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [_name, locale] = name.split("_");
    const field = profileFormValues[ _name as keyof RecipientProfileFormType ]
    let _value = value as string | LocalizedString;
    switch( locale ) {
      case 'en': 
        (field  as LocalizedString ).default = value;
        _value = field
        break;  
      case 'jp': 
        (field  as LocalizedString ).localized!['ja-JP'] = value;
        _value = field;
        break;
    }
    setProfileFormValues({ ...profileFormValues, [_name]: _value });
  };



  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertificateFormValues({ ...certificateFormValues, [name]: value });
  };

  const handleCertificateDateChange = (date: Date|null, name: string ) => {
    if (date) {
      setCertificateFormValues({ ...certificateFormValues, [name]: date.getTime() });
    } else {
      setCertificateFormValues({ ...certificateFormValues, [name]: null });
    }
  };

  const handlePrivateKeyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrivateKey(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(profileFormValues, certificateFormValues, privateKey);
    processClose();
  };

  const resetValues = () => {
    setStep(0);
    setProfileFormValues(defaultProfileFormData);
    setCertificateFormValues(defaultCertificateFormData);
    setPrivateKey('');
  };

  const processClose = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      resetValues();
    }
  }, [open]);

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
        <h2 className="text-2xl mb-4">{t("credential.addCredTitle","Add New Credential")}</h2>
        {step === 0 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="id">{t("credential.CertificateID","Certificate ID")}</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="id" value={certificateFormValues.id} onChange={handleCertificateChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="id">{t("credential.ProfileID","Profile ID")}</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="id" value={profileFormValues.id} onChange={handleProfileChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="givenName_en">{t("credential.FirstNameEnglish","First Name (English)")}</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="firstName_en" value={profileFormValues.firstName.default} onChange={handleProfileChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="givenName_jp">{t("credential.FirstNameJapanese","First Name (Japanese)")}</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="firstName_jp" value={profileFormValues.firstName.localized!["ja-JP"]} onChange={handleProfileChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="familyName_en">{t("credential.LastNameEnglish","Last Name (English)")}</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="familyName_en" value={profileFormValues.familyName.default} onChange={handleProfileChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="familyName_jp">{t("credential.LastNameJapanese","Last Name (Japanese)")}</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="familyName_jp" value={profileFormValues.familyName.localized!["ja-JP"]} onChange={handleProfileChange} />
            </div>
            {/* Add other fields for familyNamePrefix_en, familyNamePrefix_jp, givenName_en, givenName_jp */}
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="activityStartDate">{t("credential.activityStartDate","Activity Start Date")}</label>
              <DatePicker
                selected={certificateFormValues.activityStartDate ? new Date(certificateFormValues.activityStartDate) : null }
                onChange={(date: Date|null) => handleCertificateDateChange(date, 'activityStartDate')}
                className="w-full px-3 py-2 border rounded"
              />            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="activityEndDate">{t("credential.activityEndDate","Activity End Date")}</label>
              <DatePicker
                selected={certificateFormValues.activityEndDate ? new Date(certificateFormValues.activityEndDate) : null}
                onChange={(date: Date|null) => handleCertificateDateChange(date, 'activityEndDate' )}
                className="w-full px-3 py-2 border rounded" />

            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="validFrom">{t("credential.awardedDate","Issued Date / Awarded Date")}</label>
              <DatePicker
                selected={certificateFormValues.awardedDate ? new Date(certificateFormValues.awardedDate) : null}
                onChange={(date: Date|null) => handleCertificateDateChange(date, 'awardedDate' )}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            {!showExpiration && (
              <div className="mb-4">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => setShowExpiration(true)}>{t("credential.addExpiration","Add Expiration")}</button>
              </div>
            )}
            {showExpiration && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="validFrom">{t("credential.validFrom","Valid From")}</label>
                  <DatePicker
                    selected={certificateFormValues.validFrom ? new Date(certificateFormValues.validFrom) : null}
                    onChange={(date: Date|null) => handleCertificateDateChange(date, 'validFrom' )}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="validTo">{t("credential.validTo","Valid To")}</label>
                  <DatePicker
                    selected={certificateFormValues.validTo ? new Date(certificateFormValues.validTo) : null}
                    onChange={(date: Date|null) => handleCertificateDateChange(date, 'validTo' )}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <button className="text-red-500 hover:text-red-700" onClick={() => {
                    setShowExpiration(false);
                    setCertificateFormValues({ ...certificateFormValues, validTo: undefined });
                  }}>Remove Expiration</button>
                </div>
              </>
            )}
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="privateKey">{t("credential.PrivateKey","Private Key")}</label>
              <textarea
                id="privateKey"
                className="w-full px-3 py-2 border rounded"
                name="privateKey"
                value={privateKey}
                onChange={handlePrivateKeyChange}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="overflow-hidden" >
            <h3 className="text-lg mb-4">{t("credential.ConfirmDetails","Confirm Details")}</h3>
            <p><strong>{t("credential.CertificateID","Certificate ID")}:</strong> {certificateFormValues.id}</p>
            <p><strong>{t("credential.ProfileID","Profile ID")}:</strong> {profileFormValues.id}</p>
            <p><strong>{t("credential.FirstNameEnglish","First Name (English)")}:</strong> {profileFormValues.firstName.default}</p>
            <p><strong>{t("credential.FirstNameJapanese","First Name (Japanese)")}:</strong> {profileFormValues.firstName.localized!['ja-JP']}</p>
            <p><strong>{t("credential.LastNameEnglish","Last Name (English)")}:</strong> {profileFormValues.familyName.default}</p>
            <p><strong>{t("credential.LastNameJapanese","Last Name (Japanese)")}:</strong> {profileFormValues.familyName.localized!['ja-JP']}</p>
            <p><strong>{t("credential.activityStartDate","Activity Start Date")}:</strong> {certificateFormValues.activityStartDate}</p>
            <p><strong>{t("credential.activityEndDate","Activity End Date")}:</strong> {certificateFormValues.activityEndDate}</p>
            <p><strong>{t("credential.awardedDate","Issued Date / Awarded Date")}:</strong> {certificateFormValues.awardedDate}</p>
            <p><strong>{t("credential.PrivateKey","Private Key")}:</strong> {privateKey.substr(0,100)}...</p>
            <p><strong>{t("credential.validFrom","Valid From")}:</strong> {certificateFormValues.validFrom}</p>
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

