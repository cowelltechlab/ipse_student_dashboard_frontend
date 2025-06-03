// import { useEffect, useState } from "react";
// import type { ErrorType } from "../../types/ErrorType";
// import type { StudentType } from "../../types/StudentTypes";
// import { getStudents } from "../../services/studentServices";

// const useStudents = (
//     searchTerm: string | null,
//     year_id: number | null
// ) => {
//   const [students, setStudents] = useState<StudentType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<ErrorType | null>(null);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);
//         const response = await getStudents(searchTerm, year_id);
//         setStudents(response.data);
//       } catch (e) {
//         const error = e as ErrorType;
//         setError(error);
//         setStudents([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, [searchTerm, year_id]);

//   return { students, loading, error };
// };

// export default useStudents;

// TODO: Activate real hook above once backend is ready
import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { StudentType } from "../../types/StudentTypes";

const useStudents = (searchTerm: string | null, year_id: number | null) => {
    const [students, setStudents] = useState<StudentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);

                // Mock data for testing
                const mockStudents: StudentType[] = Array.from({ length: 20 }, (_, index) => ({
                    id: `student-${index + 1}`,
                    first_name: `StudentFirstName${index + 1}`,
                    last_name: `StudentLastName${index + 1}`,
                    class_year: (year_id?.toString() || "2023"),
                    reading_level: `Level ${index % 5 + 1}`,
                    writing_level: `Level ${index % 5 + 1}`,
                }));

                setStudents(mockStudents);
            } catch (e) {
                const error = e as ErrorType;
                setError(error);
                setStudents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [searchTerm, year_id]);

    return { students, loading, error };
};

export default useStudents;
