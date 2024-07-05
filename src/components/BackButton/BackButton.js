import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();
  return (
    <span style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
      <ArrowBackIcon sx={{ fontSize: 30 }} {...props} />
    </span>
  );
};

export default BackButton;
