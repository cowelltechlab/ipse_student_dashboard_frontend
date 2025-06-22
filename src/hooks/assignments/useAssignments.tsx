// import { useEffect, useState } from "react";
// import type { ErrorType } from "../../types/ErrorType";
// import { getAssignments } from "../../services/assignmentServices";
// import type { AssignmentType } from "../../types/AssignmentTypes";

// const useAssignments = (
//   dateRange: [Date, Date] | null,
//   searchTerm: string | null,
// ) => {
//   const [assignments, setAssignments] = useState<AssignmentType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<ErrorType | null>(null);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         setLoading(true);
//         const response = await getAssignments(
//           dateRange,
//           searchTerm,
//         );
//         setAssignments(response.data);
//       } catch (e) {
//         const error = e as ErrorType;
//         setError(error);
//         setAssignments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, [dateRange, searchTerm]);

//   return { assignments, loading, error };
// };


// export default useAssignments;



// TODO: Activate real hook above once backend is ready
import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { AssignmentType } from "../../types/AssignmentTypes";

const useAssignments = (
  dateRange: Date[] | null,
  searchTerm: string | null,
) => {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);

        const ratingStatuses: AssignmentType["rating_status"][] = [
          "Rated",
          "Pending",
          "Partially Rated",
        ];

        const exampleAssignments: AssignmentType[] = Array.from(
          { length: 20 },
          (_, index) => {
            const createdDate = new Date(Date.now() - index * 86400000); // Created `index` days ago
            const modifiedDate = new Date(
              createdDate.getTime() + 3600000 * (index % 5) // Add 0-4 hours
            );

            return {
              id: index + 1,
              student_first_name: `StudentFirst${index + 1}`,
              student_last_name: `StudentLast${index + 1}`,
              title: `Assignment ${index + 1}`,
              class: `Class ${(index % 3) + 1}`,
              term: `Term ${Math.ceil((index + 1) / 5)}`,
              date_created: createdDate.toISOString(),
              finalized: index % 2 === 0,
              rating_status: ratingStatuses[index % ratingStatuses.length],
              date_modified: modifiedDate.toISOString(),
            };
          }
        );

        setAssignments(exampleAssignments);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [dateRange, searchTerm]);

  return { assignments, loading, error };
};

export default useAssignments;
