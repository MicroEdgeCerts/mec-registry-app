// __tests__/AddCourseDialog.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import AddCourseDialog from '@/components/AddCourse/AddCourseDialog';
import { AchievementCredeintialFormType } from '../types';

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
};

describe('AddCourseDialog Component', () => {
  const onCloseMock = jest.fn();
  const onAddCourseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render and display the first step', () => {
    render(<AddCourseDialog open={true} onClose={onCloseMock} onAddCourse={onAddCourseMock} />);

    expect(screen.getByText(/Add New Course/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Course Name \(English\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
  });

  test('should close the dialog when clicking outside', () => {
    render(<AddCourseDialog open={true} onClose={onCloseMock} onAddCourse={onAddCourseMock} />);
    
    fireEvent.mouseDown(document);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should navigate through the steps and submit form', () => {
    render(<AddCourseDialog open={true} onClose={onCloseMock} onAddCourse={onAddCourseMock} />);

    // Step 1
    fireEvent.change(screen.getByLabelText(/Course Name \(English\)/i), { target: { value: 'Course Name' } });
    fireEvent.change(screen.getByLabelText(/Website/i), { target: { value: 'http://example.com' } });
    fireEvent.click(screen.getByText(/Next/i));

    // Step 2
    expect(screen.getByLabelText(/Description \(English\)/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Description \(English\)/i), { target: { value: 'Course Description' } });
    fireEvent.click(screen.getByText(/Next/i));

    // Step 3
    // Assuming FileUpload component mock is handling the upload process
    fireEvent.click(screen.getByText(/Next/i));

    // Step 4
    expect(screen.getByLabelText(/Public Keys/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Public Keys/i), { target: { value: 'key1,key2' } });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(onAddCourseMock).toHaveBeenCalledWith({
      ...defaultFormData,
      name_en: 'Course Name',
      url: 'http://example.com',
      description_en: 'Course Description',
      key_sets: ['key1', 'key2'],
    });
  });
});