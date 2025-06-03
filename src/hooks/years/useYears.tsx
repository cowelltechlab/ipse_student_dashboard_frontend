// import { useEffect, useState } from "react";
// import type { ErrorType } from "../../types/ErrorType";
// import { getYears } from "../../services/YearsServices";

// const useYears = () => {
//   const [years, setYears] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<ErrorType | null>(null);

//   useEffect(() => {
//     const fetchYears = async () => {
//       try {
//         setLoading(true);
//         const response = await getYears();
//         setYears(response.data);
//       } catch (e) {
//         const error = e as ErrorType;
//         setError(error);
//         setYears([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchYears();
//   }, []);

//   return { years, loading, error };
// };

// export default useYears;

// TODO: Activate real hook above once backend is ready
import { useEffect, useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { YearType } from "../../types/YearTypes";

const useYears = () => {
  const [years, setYears] = useState<YearType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        // Hardcoded data for testing
        const fakeYears = [
          { id: 1, name: "Freshman" },
          { id: 2, name: "Sophomore" },
          { id: 3, name: "Junior" },
          { id: 4, name: "Senior" },
        ];
        setYears(fakeYears);
      } catch (e) {
        const error = e as ErrorType;
        setError(error);
        setYears([]);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, []);

  return { years, loading, error };
};

export default useYears;
