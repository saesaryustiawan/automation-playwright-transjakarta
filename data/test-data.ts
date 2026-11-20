export const applicationPaths = {
  webTables: '/webtables',
  droppable: '/droppable',
  resizable: '/resizable',
  studentRegistration: '/automation-practice-form',
} as const;

export type StudentRegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Female' | 'Male' | 'Other';
  mobile: string;
  dateOfBirth: string;
  subject: string;
  hobby: 'Sports' | 'Reading' | 'Music';
  address: string;
  state: string;
  city: string;
};

export const studentRegistration: StudentRegistrationData = {
  firstName: 'Alya',
  lastName: 'Pratama',
  email: 'alya.pratama@example.com',
  gender: 'Female',
  mobile: '0812345678',
  dateOfBirth: '15 May 1995',
  subject: 'Maths',
  hobby: 'Reading',
  address: 'Jl. Merdeka No. 10',
  state: 'NCR',
  city: 'Delhi',
};
