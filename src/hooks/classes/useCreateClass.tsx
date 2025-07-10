import { useState } from "react"
import type { ErrorType } from "../../types/ErrorType"
import { postClass } from "../../services/classServices"



const useCreateClass = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleCreateClass = async (courseCode: string, courseName: string, semester: string, classType: "IPSE" | "Inclusive") => {
        try {
            setLoading(true)
            const response = await postClass(courseName, semester, classType, courseCode)
            return response
        } catch (e) {
            throw e as ErrorType
        } finally {
            setLoading(false)
        }
    }

    return {loading, handleCreateClass}
}   


export default useCreateClass