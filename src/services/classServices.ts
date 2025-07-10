import apiClient from "./apiClient";

export const getClasses = async () => {
  const response = await apiClient.get("/classes");
  return response.data;
};


export const postClass = async (
  name: string,
  term: string,
  type: "IPSE" | "Inclusive",
  course_code: string
) => {
  const response = await apiClient.post("/classes", {
    name, 
    term,
    type,
    course_code
  })

  return response.data
}
