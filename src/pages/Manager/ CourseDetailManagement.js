import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuComponent from "../../components/LeftMenu/Menu";

const courses = [
  {
    id: "4713fc09-2967-4e59-a832-04db1379baad",
    code: "ACC101",
    description: "Introductory Accounting",
    semesterName: "Fall 2024",
    createdBy: "John Doe",
  },
  {
    id: "f5a016b9-97c2-4832-ba68-490d8825225e",
    code: "SWR302",
    description: "Advanced Software Engineering",
    semesterName: "Spring 2024",
    createdBy: "Jane Smith",
  },
  {
    id: "84ec946c-7b70-45c5-9ac5-7c6123644e4b",
    code: "ECO201",
    description: "Principles of Macroeconomics",
    semesterName: "Fall 2024",
    createdBy: "Michael Johnson",
  },
  {
    id: "5e7fbf37-4a7e-4a82-b298-8cbcba4a0c6b",
    code: "BIO150",
    description: "General Biology",
    semesterName: "Spring 2024",
    createdBy: "Sarah Lee",
  },
  {
    id: "a2c5ea9e-4d7b-4e18-82fc-d0a269acaf5a",
    code: "CSC110",
    description: "Introduction to Computer Science",
    semesterName: "Fall 2024",
    createdBy: "David Kim",
  },
  {
    id: "8e9be1a0-cef6-4893-8a0d-e37d6e8abc11",
    code: "ENG201",
    description: "English Composition",
    semesterName: "Spring 2024",
    createdBy: "Emily Chen",
  },
  {
    id: "c4ac0d73-a279-4e91-9d67-5f4b35032766",
    code: "MAT201",
    description: "Calculus I",
    semesterName: "Fall 2024",
    createdBy: "Daniel Park",
  },
  {
    id: "f6b44d20-3fa2-476a-8c6c-1c4cdf79b6c1",
    code: "HIS101",
    description: "World History to 1500",
    semesterName: "Spring 2024",
    createdBy: "Olivia Lim",
  },
  {
    id: "3b5b2e2c-aa54-4e9a-8f9a-d6a6f5ba9d31",
    code: "PHY101",
    description: "Introduction to Physics",
    semesterName: "Fall 2024",
    createdBy: "Alex Tan",
  },
  {
    id: "7d1f2a9a-d2d4-4d06-b2c9-84e991f2aa69",
    code: "ART120",
    description: "Art Appreciation",
    semesterName: "Spring 2024",
    createdBy: "Jessica Wang",
  },
];

const initialClasses = [
  {
    id: "1",
    courseId: "4713fc09-2967-4e59-a832-04db1379baad",
    name: "Class A",
    teacherId: 1,
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    isActive: true,
  },
  {
    id: "2",
    courseId: "4713fc09-2967-4e59-a832-04db1379baad",
    name: "Class B",
    teacherId: 2,
    startDate: "2024-09-01",
    endDate: "2024-12-15",
    isActive: true,
  },
  // ... other class data
];

const teachers = [
  {
    id: 1,
    name: "John Doe",
    subjects: ["Math", "Science"],
    yearsExperience: 10,
  },
  {
    id: 2,
    name: "Jane Smith",
    subjects: ["English", "History"],
    yearsExperience: 7,
  },
  {
    id: 3,
    name: "Bob Johnson",
    subjects: ["Art", "Music"],
    yearsExperience: 5,
  },
];
const CourseDetailPage = () => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);
  const [classes, setClasses] = useState(initialClasses);
  const [open, setOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState({
    id: "",
    courseId: id,
    name: "",
    teacherId: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpen = () => {
    setCurrentClass({
      id: "",
      courseId: id,
      name: "",
      teacherId: "",
      startDate: "",
      endDate: "",
      isActive: true,
    });
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (isEditing) {
      setClasses(
        classes.map((cls) => (cls.id === currentClass.id ? currentClass : cls))
      );
    } else {
      setCurrentClass((prev) => ({ ...prev, id: Date.now().toString() }));
      setClasses([...classes, currentClass]);
    }
    setOpen(false);
  };

  const handleEdit = (cls) => {
    setCurrentClass(cls);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  if (!course) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Course Not Found
        </Typography>
        <Typography variant="body1">
          The course you are looking for does not exist.
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      <MenuComponent role="manager" />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          {course.code}: {course.description}
        </Typography>
        <Typography variant="h6" component="h2">
          Semester: {course.semesterName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Created by: {course.createdBy}
        </Typography>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add Class
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Is Active</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{cls.name}</TableCell>
                      <TableCell>
                        {teachers.find((t) => t.id === cls.teacherId)?.name}
                      </TableCell>
                      <TableCell>{cls.startDate}</TableCell>
                      <TableCell>{cls.endDate}</TableCell>
                      <TableCell>
                        <Checkbox checked={cls.isActive} disabled />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(cls)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(cls.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {open && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={currentClass.name}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Teacher</InputLabel>
                <Select
                  value={currentClass.teacherId}
                  onChange={(e) =>
                    setCurrentClass({
                      ...currentClass,
                      teacherId: e.target.value,
                    })
                  }
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Start Date"
                type="date"
                value={currentClass.startDate}
                onChange={(e) =>
                  setCurrentClass({
                    ...currentClass,
                    startDate: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="End Date"
                type="date"
                value={currentClass.endDate}
                onChange={(e) =>
                  setCurrentClass({
                    ...currentClass,
                    endDate: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default CourseDetailPage;
