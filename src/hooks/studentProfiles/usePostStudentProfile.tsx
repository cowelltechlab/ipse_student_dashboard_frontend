import { useState } from "react";
import type { ErrorType } from "../../types/ErrorType";
import type { ClassSelectionType } from "../../types/ClassTypes";
import { postStudentProfile } from "../../services/studentProfileServices";

const usePostStudentProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostStudentProfile = async (
    user_id: string,

    first_name: string,
    last_name: string,
    year_id: number,
    classes: ClassSelectionType[],

    long_term_goal: string,
    strengths: string[],
    weaknesses: string[],

    likes_and_hobbies: string,
    short_term_goal: string,

    best_way_to_help: string,

    reading_level_list: string[],
    writing_level_list: string[]
  ) => {
    try {


      setLoading(true);
      const response = await postStudentProfile(
        user_id,
        first_name,
        last_name,
        year_id,
        classes,
        long_term_goal,
        strengths,
        weaknesses,
        likes_and_hobbies,
        short_term_goal,
        best_way_to_help,
        reading_level_list,
        writing_level_list
      );
      return response;
    } catch (e) {
      throw e as ErrorType;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostStudentProfile };
};

export default usePostStudentProfile;
