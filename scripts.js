document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("medication-form");
  const medicationList = document.getElementById("medication-list");
  const confirmationMessage = document.getElementById("confirmation-message");
  const stockTable = document.getElementById("stock-table");

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
    updateAllQuantities();
  };

  const updateAllQuantities = () => {
    const items = [
      { detailId: "details1", quantityId: "quantity1" },
      { detailId: "details2", quantityId: "quantity2" },
      { detailId: "details3", quantityId: "quantity3" },
      { detailId: "details4", quantityId: "quantity4" },
    ];

    items.forEach((item) => {
      const detailsTable = document.querySelector(
        `#${item.detailId} table tbody`
      );
      let totalQuantity = 0;
      const medicationRows = detailsTable.querySelectorAll("tr");

      medicationRows.forEach((row) => {
        const quantityCell = row.querySelector("td:nth-child(2)");
        if (quantityCell) {
          totalQuantity += parseInt(quantityCell.textContent.trim(), 10);
        }
      });

      const quantityCell = document.getElementById(item.quantityId);
      if (quantityCell) {
        quantityCell.textContent = totalQuantity;
      }
    });
  };

  updateAllQuantities();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const dosage = document.getElementById("dosage").value;
    const frequency = document.getElementById("frequency").value;
    const startDate = document.getElementById("startDate").value;

    const medication = { name, dosage, frequency, startDate };
    medications.push(medication);
    localStorage.setItem("medications", JSON.stringify(medications));
    renderMedications();

    // Exibir mensagem de confirmação
    confirmationMessage.style.display = "block";
    setTimeout(() => {
      confirmationMessage.style.display = "none";
    }, 3000);

    form.reset();
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
