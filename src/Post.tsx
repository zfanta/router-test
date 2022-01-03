import {useNavigate} from "react-router-dom";

export default function Post() {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate(-1)}>Back</div>
      <p>tmp</p>
    </div>
  );
}
