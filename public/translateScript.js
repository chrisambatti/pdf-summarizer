document
  .getElementById("translateForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const fileInput = document.getElementById("file");
    const targetLanguage = document.getElementById("language").value;

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", fileInput.files[0]); // Append the uploaded file
    formData.append("language", targetLanguage); // Append the target language

    // Use fetch to send the FormData
    try {
      let Response = await fetch("/translate", {
        method: "POST",
        body: formData,
      });
      let data = await Response.text();
      console.log("ABC", data);

      if (data) {
        document.getElementById("translation").textContent = data;
        document.getElementById("translation").classList.remove("hide"); // Show the error message
      } else {
        throw new Error("Network Error " + Response.statusText);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      const translationDiv = document.getElementById("translation");
      translationDiv.textContent = "Error: " + error.message; // Display error message
      translationDiv.classList.remove("hide"); // Show the error message
    }
  });
