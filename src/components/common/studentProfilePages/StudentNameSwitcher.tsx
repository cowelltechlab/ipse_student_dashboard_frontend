import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useRef, useEffect, useState } from "react";
import useStudents from "../../../hooks/students/useStudents";
import type { StudentProfileType } from "../../../types/StudentTypes";
import { Box } from "@chakra-ui/react";

const SITE_ORANGE = "#BD4F23";

// Larger orange dropdown arrow as data URI (chevron down)
const DROPDOWN_ARROW_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(SITE_ORANGE)}' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;

interface StudentNameSwitcherProps {
  student: StudentProfileType | null;
  profileLoading: boolean;
  /** "header" = white text on blue background; "standalone" = dark text on light background */
  variant?: "header" | "standalone";
}

const StudentNameSwitcher = ({
  student,
  profileLoading,
  variant = "header",
}: StudentNameSwitcherProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, loading: studentsLoading } = useStudents();
  const measureRef = useRef<HTMLSpanElement>(null);
  const [selectWidth, setSelectWidth] = useState<number | null>(null);

  const currentId = student ? String(student.student_id) : "";
  const isLoading = profileLoading || studentsLoading;

  const longestName = useMemo(() => {
    if (!students.length) return "";
    return students.reduce((longest, s) => {
      const name = `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim();
      const longestStr = `${longest.first_name ?? ""} ${longest.last_name ?? ""}`.trim();
      return name.length > longestStr.length ? s : longest;
    }, students[0]);
  }, [students]);

  const longestNameStr = useMemo(
    () => `${longestName?.first_name ?? ""} ${longestName?.last_name ?? ""}`.trim() || "Student",
    [longestName]
  );

  const fontSize = variant === "standalone" ? 16 : 22;
  const paddingRight = 44; // room for larger arrow

  useEffect(() => {
    if (!measureRef.current || !longestNameStr) return;
    const textWidth = measureRef.current.offsetWidth;
    setSelectWidth(textWidth + 12 + paddingRight); // left padding + text + right (arrow)
  }, [longestNameStr, students, paddingRight]);

  // In header variant, show static name while loading so the card doesn't look empty
  if (isLoading && variant === "header" && student) {
    const name = `${student.first_name ?? ""} ${student.last_name ?? ""}`.trim();
    return (
      <Box
        as="span"
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: "white",
          display: "inline-block",
        }}
      >
        {name || "Student"}
      </Box>
    );
  }

  if (isLoading) {
    return null;
  }

  const selectStyle: React.CSSProperties = {
    minWidth: 120,
    width: selectWidth ?? undefined,
    background: "white",
    color: "#1a202c",
    border: "1px solid",
    borderColor: "#E2E8F0",
    fontSize,
    fontWeight: 700,
    display: "inline-block",
    padding: "4px 12px",
    paddingRight: `${paddingRight}px`,
    borderRadius: "6px",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: DROPDOWN_ARROW_SVG,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
    backgroundSize: "28px 28px",
  };

  return (
    <Box display="inline-block">
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          fontSize,
          fontWeight: 700,
          fontFamily: "inherit",
        }}
      >
        {longestNameStr}
      </span>
      <select
        aria-label="Select student"
        value={currentId}
        onChange={(e) => {
          const val = e.target.value;
          if (!val) return;
          const newPath = location.pathname.replace(
            /^\/student\/[^/]+/,
            `/student/${val}`
          );
          navigate(newPath);
        }}
        style={selectStyle}
      >
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {`${s.first_name ?? ""} ${s.last_name ?? ""}`.trim()}
          </option>
        ))}
      </select>
    </Box>
  );
};

export default StudentNameSwitcher;
