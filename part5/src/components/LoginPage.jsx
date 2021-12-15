import { useRef } from "react";

export default function LoginPage(props) {
  const userNameInput = useRef(null);
  const passwordInput = useRef(null);

  async function sendUserToServer() {
    const usernameValue = userNameInput.current.value;
    const passwordValue = passwordInput.current.value;
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });
      if (response.ok) {
        console.log("ok");
        const fullResponse = await response.json();
        console.log(fullResponse.username);
        localStorage.setItem("Username", fullResponse.username);
        props.setUsername(fullResponse.username);
        props.setNofication({ text: "", color: "" });
        return;
      }
      throw response;
    } catch (err) {
      props.setNofication({ text: "invalid all", color: "red" });
    }
  }
  return (
    <div>
      <p style={{ color: props.Nofication.color }}>{props.Nofication.text}</p>
      <h1>Login</h1>
      <p>
        Username:
        <input
          id="userNameInput"
          ref={userNameInput}
          type="text"
          placeholder="UserName"
        />
      </p>
      <p>
        Password:
        <input
          id="passwordInput"
          ref={passwordInput}
          type="password"
          placeholder="******"
        />
      </p>
      <button
        id="SingInBtn"
        onClick={() => {
          sendUserToServer();
        }}
      >
        Sign In
      </button>
    </div>
  );
}
