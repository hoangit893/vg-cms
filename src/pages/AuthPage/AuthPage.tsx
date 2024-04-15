import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage() {
  return (
    <>
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f0f2f5",
          height: "100vh",
        }}
        className="auth__form "
      >
        <LoginForm />
      </div>
    </>
  );
}
