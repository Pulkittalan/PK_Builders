document.getElementById("book-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const rawDate = document.getElementById("appointmentDate").value;
  const rawTime = document.getElementById("appointmentTime").value;

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    serviceType: document.getElementById("serviceType").value,
    location: document.getElementById("location").value,
    notes: document.getElementById("notes").value,
    appointmentDate: new Date(rawDate).toLocaleDateString(),
    appointmentTime: new Date(`${rawDate}T${rawTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  try {
    const response = await fetch("http://localhost:3000/book-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    const confirmation = document.getElementById("confirmation");

    if (result.success) {
      confirmation.textContent = "Booking confirmed! Check your email.";
      confirmation.style.color = "green";
      document.getElementById("book-form").reset();
    } else {
      confirmation.textContent = "Failed to send confirmation email.";
      confirmation.style.color = "red";
    }
  } catch (error) {
    console.error(error);
  }
});
