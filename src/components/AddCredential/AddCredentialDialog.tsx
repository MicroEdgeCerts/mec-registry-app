import React, { useState, useEffect, useRef } from 'react';
import { RecipientProfileFormType, CredentialCertificateFormType } from '@/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddCredentialDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit:  (profile: RecipientProfileFormType, certificate: CredentialCertificateFormType, privateKey: string) => void;
}

const defaultProfileFormData: RecipientProfileFormType = {
  id: '',
  familyName_en: '',
  familyName_jp: { default: '', localized: { 'ja-JP': '' } },
  familyNamePrefix_en: '',
  familyNamePrefix_jp: '',
  givenName_en: '',
  givenName_jp: ''
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

export const AddCredentialDialog: React.FC<AddCredentialDialogProps> = ({ open, onClose, onSubmit }) => {
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
    setProfileFormValues({ ...profileFormValues, [name]: value });
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
        <h2 className="text-2xl mb-4">Add New Credential</h2>
        {step === 0 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="id">Certificate ID</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="id" value={certificateFormValues.id} onChange={handleCertificateChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="id">Profile ID</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="id" value={profileFormValues.id} onChange={handleProfileChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="familyName_en">Family Name (English)</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="familyName_en" value={profileFormValues.familyName_en} onChange={handleProfileChange} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="familyName_jp">Family Name (Japanese)</label>
              <input className="w-full px-3 py-2 border rounded" type="text" name="familyName_jp" value={profileFormValues.familyName_jp.default} onChange={handleProfileChange} />
            </div>
            {/* Add other fields for familyNamePrefix_en, familyNamePrefix_jp, givenName_en, givenName_jp */}
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="activityStartDate">Activity Start Date</label>
              <DatePicker
                selected={certificateFormValues.activityStartDate ? new Date(certificateFormValues.activityStartDate) : null }
                onChange={(date: Date|null) => handleCertificateDateChange(date, 'activityStartDate')}
                className="w-full px-3 py-2 border rounded"
              />            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="activityEndDate">Activity End Date</label>
              <DatePicker
                selected={certificateFormValues.activityEndDate ? new Date(certificateFormValues.activityEndDate) : null}
                onChange={(date: Date|null) => handleCertificateDateChange(date, 'activityEndDate' )}
                className="w-full px-3 py-2 border rounded" />

            </div>

            {!showExpiration && (
              <div className="mb-4">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => setShowExpiration(true)}>Add Expiration</button>
              </div>
            )}
            {showExpiration && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="validFrom">Valid From</label>
                  <DatePicker
                    selected={certificateFormValues.validFrom ? new Date(certificateFormValues.validFrom) : null}
                    onChange={(date: Date|null) => handleCertificateDateChange(date, 'validFrom' )}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="validTo">Valid To</label>
                  <DatePicker
                    selected={certificateFormValues.validTo ? new Date(certificateFormValues.validTo) : null}
                    onChange={(date: Date|null) => handleCertificateDateChange(date, 'validTo' )}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <button className="text-red-500 hover:text-red-700" onClick={() => {
                    setShowExpiration(false);
                    setCertificateFormValues({ ...certificateFormValues, validFrom: undefined, validTo: undefined });
                  }}>Remove Expiration</button>
                </div>
              </>
            )}
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="privateKey">Private Key</label>
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
          <div>
            <h3 className="text-lg mb-4">Confirm Details</h3>
            <p><strong>Profile ID:</strong> {profileFormValues.id}</p>
            <p><strong>Family Name (English):</strong> {profileFormValues.familyName_en}</p>
            <p><strong>Family Name (Japanese):</strong> {profileFormValues.familyName_jp.default}</p>
            <p><strong>Certificate ID:</strong> {certificateFormValues.id}</p>
            <p><strong>Activity Start Date:</strong> {certificateFormValues.activityStartDate}</p>
            <p><strong>Activity End Date:</strong> {certificateFormValues.activityEndDate}</p>
            <p><strong>Private Key:</strong> {privateKey}</p>
            {/* Display other fields */}
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

