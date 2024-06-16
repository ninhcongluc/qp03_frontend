import React, { useState } from "react";
import StudentMenu from "../../components/LeftMenu/StudentMenu";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CourseCard from "../../components/Card/StudentCourseCard";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const courses = [
  {
    
    code: "ACC101",
    image: "https://via.placeholder.com/150",
    instructor: "HungNP30",
    url: "./ACC101",
    
  },
  {
    code: "SWR302",
    image: "https://via.placeholder.com/150",
    instructor: "TriTD",
    url: "./SWR302",
  },
  {
    code: "SWP391",
    image: "https://via.placeholder.com/150",
    instructor: "ThanHDT59",
    url: "./SWP391",
  },
  {
    code: "SWT301",
    image: "https://via.placeholder.com/150",
    instructor: "NangNTH",
  },
  {
    code: "MAS291",
    image: "https://via.placeholder.com/150",
    instructor: "LongDQ",
  },
  {
    code: "PRJ301",
    image: "https://via.placeholder.com/150",
    instructor: "SonNT5",
  },
  {
    code: "CS107",
    image: "https://via.placeholder.com/150",
    instructor: "Anna Blue",
  },
  {
    code: "CS108",
    image: "https://via.placeholder.com/150",
    instructor: "Tom Brown",
  },
  {
    code: "CS109",
    image: "https://via.placeholder.com/150",
    instructor: "John Green",
  },
  {
    code: "CS110",
    image: "https://via.placeholder.com/150",
    instructor: "Jane Red",
  },
  {
    code: "CS111",
    image: "https://via.placeholder.com/150",
    instructor: "James Purple",
  },
  {
    code: "CS112",
    image: "https://via.placeholder.com/150",
    instructor: "Emily Yellow",
  },
];

const StudentCourseListPage = () => {
  const [page, setPage] = useState(1);
  const coursesPerPage = 6;

  // Tính toán số lượng trang
  const pageCount = Math.ceil(courses.length / coursesPerPage);

  // Lấy các khóa học cho trang hiện tại
  const displayedCourses = courses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            COURSE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  
    <Box sx={{ height: 16 }} /> {/* Spacer Box */}
  
    <StudentMenu />
  
    <Container>
      <Grid container spacing={4}>
        {displayedCourses.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Container>
  </div>
  );
};

export default StudentCourseListPage;
