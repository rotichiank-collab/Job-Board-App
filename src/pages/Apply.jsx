import { useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";

function Apply() {
  const { id } = useParams();

  return (
    <div className="apply-page">
      <h2>Apply for this Job</h2>
      <ApplicationForm jobId={id} />
    </div>
  );
}

export default Apply;
