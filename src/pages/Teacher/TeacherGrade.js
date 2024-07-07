import React from 'react';
import { Box } from '@mui/material';
import ManagementGrade from '../../components/Table/ManagementGrade';
import MenuComponent from '../../components/LeftMenu/Menu';

const TeacherGrade = () => {
  // Dữ liệu ảo
  const fakeData = [
    {
      studentName: 'John Doe',
      studentId: 'S12345',
      quizName: 'PT1',
      state: 'done',
      submissionTime: '2023-07-01 10:00',
      score: 85,
      classId: 'C1',
      className: 'Class A'
    },
    {
      studentName: 'Jane Smith',
      studentId: 'S67890',
      quizName: 'PT1',
      state: 'doing',
      submissionTime: '2023-07-01 11:00',
      score: null,
      classId: 'C2',
      className: 'Class B'
    },
    {
      studentName: 'Alice Johnson',
      studentId: 'S11121',
      quizName: 'PT2',
      state: 'fail',
      submissionTime: '2023-07-02 09:00',
      score: 45,
      classId: 'C3',
      className: 'Class C'
    },
  ];

  return (
    <div className="table_managementGrade">
      <MenuComponent role="teacher" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
          width: '700px',
        }}
      >
        <h1 style={{ marginBottom: '1.5rem' }}>Student Grade Overview</h1>
        <ManagementGrade data={fakeData} />
      </Box>
    </div>
  );
};

export default TeacherGrade;
