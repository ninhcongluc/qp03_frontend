import React, { useEffect, useState } from "react";
import MenuComponent from "../../components/LeftMenu/Menu";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const TeacherGrade = ({ teacherId }) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    // Hardcoded class list
    const fetchClassList = async () => {
      try {
        const response = [
          { id: "class1", name: "Class A" },
          { id: "class2", name: "Class B" },
          { id: "class3", name: "Class C" },
        ];
        setClassList(response);
      } catch (err) {
        console.error("Error fetching class list:", err);
      }
    };

    fetchClassList();
  }, [teacherId]);

  const handleClassSelect = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    fetchGrades(selectedClass);
  };

  const fetchGrades = async (classId) => {
    setLoading(true);
    try {
      let response;
      if (classId === "class1") {
        response = [
          {
            id: "1",
            studentId: "student1",
            quizId: "quiz1",
            score: 85,
            status: "done",
            submissionTime: "2024-07-07T10:00:00Z",
          },
          {
            id: "2",
            studentId: "student2",
            quizId: "quiz2",
            score: 90,
            status: "done",
            submissionTime: "2024-07-07T12:00:00Z",
          },
        ];
      } else if (classId === "class2") {
        response = [
          {
            id: "3",
            studentId: "student3",
            quizId: "quiz3",
            score: 75,
            status: "done",
            submissionTime: "2024-07-07T14:00:00Z",
          },
          {
            id: "4",
            studentId: "student4",
            quizId: "quiz4",
            score: 80,
            status: "done",
            submissionTime: "2024-07-07T16:00:00Z",
          },
        ];
      } else if (classId === "class3") {
        response = [
          {
            id: "5",
            studentId: "student5",
            quizId: "quiz5",
            score: 95,
            status: "done",
            submissionTime: "2024-07-07T18:00:00Z",
          },
          {
            id: "6",
            studentId: "student6",
            quizId: "quiz6",
            score: 88,
            status: "done",
            submissionTime: "2024-07-07T20:00:00Z",
          },
        ];
      }

      setGrades(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading grades: {error.message}</div>;
  }

  return (
    <>
      <MenuComponent role="teacher" />
      <FormControl style={{ margin: "20px" }}>
        <InputLabel>Select Class</InputLabel>
        <Select value={selectedClass} onChange={handleClassSelect}>
          <MenuItem value="" disabled>
            Select Class
          </MenuItem>
          {classList.map((classItem) => (
            <MenuItem key={classItem.id} value={classItem.id}>
              {classItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedClass && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Quiz ID</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submission Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>{grade.studentId}</TableCell>
                  <TableCell>{grade.quizId}</TableCell>
                  <TableCell>{grade.score}</TableCell>
                  <TableCell>{grade.status}</TableCell>
                  <TableCell>
                    {new Date(grade.submissionTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleReview(grade.id)}
                    >
                      Review
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleStart(grade.quizId)}
                    >
                      Start
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

const handleReview = (resultId) => {
  console.log(`Review result ID: ${resultId}`);
};

const handleStart = (quizId) => {
  console.log(`Start quiz ID: ${quizId}`);
};

export default TeacherGrade;
