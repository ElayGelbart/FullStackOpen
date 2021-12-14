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
        return;
      }
      throw response;
    } catch (err) {
      alert("no good");
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <p>
        Username:
        <input ref={userNameInput} type="text" placeholder="UserName" />
      </p>
      <p>
        Password:
        <input ref={passwordInput} type="password" placeholder="******" />
      </p>
      <button
        onClick={() => {
          sendUserToServer();
        }}
      >
        Sign In
      </button>
    </div>
  );
}
