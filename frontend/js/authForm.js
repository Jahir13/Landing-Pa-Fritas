const handleSubmit = async (event, mode) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const messageElement = document.getElementById("message");
  messageElement.textContent = "";
  messageElement.classList.remove("bg-green-100", "text-green-700", "bg-red-100", "text-red-700");

  try {
    const url = mode === "login" ? "http://localhost:3000/users/login" : "http://localhost:3000/users";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      if (mode === "login") {
        // Guardar el usuario en localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        // Redirigir a la página de inicio
        window.location.href = "/";
      } else {
        // Mostrar mensaje de éxito y redirigir a la página de inicio de sesión
        messageElement.textContent = "Usuario creado correctamente. Redirigiendo...";
        messageElement.classList.add("bg-green-100", "text-green-700");
        setTimeout(() => {
          window.location.href = "/iniciar-sesion";
        }, 2000);
      }
    } else {
      // Mostrar mensaje de error
      messageElement.textContent = result.message || "Error en la solicitud";
      messageElement.classList.add("bg-red-100", "text-red-700");
    }
  } catch (error) {
    // Mostrar mensaje de error de conexión
    messageElement.textContent = "Error de conexión";
    messageElement.classList.add("bg-red-100", "text-red-700");
  }
};

// Asignar el manejador de eventos al formulario
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => handleSubmit(event, "login"));
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => handleSubmit(event, "register"));
  }
});