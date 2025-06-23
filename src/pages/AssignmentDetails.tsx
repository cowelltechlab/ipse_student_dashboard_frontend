import { useParams } from "react-router-dom";

const AssignmentDetails = () => {
    const { student_id, assignment_id } = useParams<{ student_id: string; assignment_id: string }>();

    return (
        <div>
            <h1>Assignment Details</h1>
            <p>Student ID: {student_id}</p>
            <p>Assignment ID: {assignment_id}</p>
        </div>
    );
};

export default AssignmentDetails;
