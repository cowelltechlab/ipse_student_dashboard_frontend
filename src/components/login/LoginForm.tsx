import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import type { UserRole } from "../../contexts/AuthContext";
import { PasswordInput } from "../ui/password-input";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    // TODO: Implement actual auth logic
    // Mock login: log in all users as 'teacher'
    const mockRole: UserRole = "teacher" as UserRole;

    login(mockRole);

    switch (mockRole) {
        case "student":
            navigate("/dashboard");
            break;
        case "teacher":
            navigate("/teacher-dashboard");
            break;
        case "admin":
            navigate("/admin-dashboard");
            break;
        default:
            navigate("/");
        

    navigate("/dashboard");
    }
}

  return (
    <form onSubmit={onSubmit}>
      <Box backgroundColor="white" padding="4" borderRadius="md" boxShadow="md">
        <Stack gap="4" align="flex-start" maxW="sm">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="flushed"
          />
          <PasswordInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="flushed"
          />
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
          <Button variant="outline">Log in with Google</Button>
          <Button variant="outline">Log in with Georgia Tech SSO</Button>
        </Stack>
      </Box>
    </form>
  );
};


export default LoginForm;
