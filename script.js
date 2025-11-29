// Vorschaubild anzeigen
document.getElementById("imgUpload").addEventListener("change", function() {
    const file = this.files[0];
    const img = document.getElementById("preview");
    img.src = URL.createObjectURL(file);
    img.style.display = "block";
});

async function sendImage() {
    const file = document.getElementById("imgUpload").files[0];
    if (!file) {
        alert("Bitte zuerst ein Bild auswählen!");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // Spinner einblenden
    document.getElementById("spinner").style.display = "block";
    document.getElementById("output").textContent = "";

    try {
        const res = await fetch("https://miezi-website-backend.onrender.com", { method: "POST", body: formData });
        const data = await res.json();

        // Spinner ausblenden
        document.getElementById("spinner").style.display = "none";

        document.getElementById("output").textContent = data.reply;
    } catch (err) {
        console.error(err);
        document.getElementById("spinner").style.display = "none";
        document.getElementById("output").textContent = "Fehler beim Senden!";
    }
}

