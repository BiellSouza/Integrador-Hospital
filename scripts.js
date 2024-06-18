document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("medication-form");
  const medicationList = document.getElementById("medication-list");
  const confirmationMessage = document.getElementById("confirmation-message");

  let medications = JSON.parse(localStorage.getItem("medications")) || [];

  const renderMedications = () => {
    medicationList.innerHTML = "";
    medications.forEach((medication, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item medication-item";
      li.innerHTML = `
                <span>${medication.name} - ${medication.dosage} - ${medication.frequency} - ${medication.startDate}</span>
                <div>
                    <button class="btn btn-warning btn-sm" onclick="editMedication(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMedication(${index})">Remover</button>
                </div>
            `;
      medicationList.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const dosage = document.getElementById("dosage").value;
    const frequency = document.getElementById("frequency").value;
    const startDate = document.getElementById("startDate").value;

    const newMedication = { name, dosage, frequency, startDate };
    medications.push(newMedication);
    localStorage.setItem("medications", JSON.stringify(medications));
    renderMedications();
    form.reset();

    // Mostrar a mensagem de confirmação
    confirmationMessage.style.display = "block";
    setTimeout(() => {
      confirmationMessage.style.display = "none";
    }, 3000); // Ocultar a mensagem após 3 segundos
  });

  window.editMedication = (index) => {
    const medication = medications[index];
    document.getElementById("name").value = medication.name;
    document.getElementById("dosage").value = medication.dosage;
    document.getElementById("frequency").value = medication.frequency;
    document.getElementById("startDate").value = medication.startDate;
    medications.splice(index, 1);
    localStorage.setItem("medications", JSON.stringify(medications));
    renderMedications();
  };

  window.deleteMedication = (index) => {
    medications.splice(index, 1);
    localStorage.setItem("medications", JSON.stringify(medications));
    renderMedications();
  };

  renderMedications();
});
