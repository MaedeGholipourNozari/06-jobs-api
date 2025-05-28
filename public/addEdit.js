import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showExperiences } from "./experiences.js";

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let addingExperience = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-experience");
  company = document.getElementById("company");
  position = document.getElementById("position");
  status = document.getElementById("status");
  addingExperience = document.getElementById("adding-experience");
  const editCancel = document.getElementById("edit-cancel");

  
addEditDiv.addEventListener("click", async (e) => {
  if (inputEnabled && e.target.nodeName === "BUTTON") {
   if (e.target === addingExperience) {
  enableInput(false);

  let method = "POST";
  let url = "/api/v1/experiences";

  if (addingExperience.textContent === "update") {
    method = "PATCH";
    url = `/api/v1/experiences/${addEditDiv.dataset.id}`;
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: company.value,
        position: position.value,
        status: status.value,
      }),
    });

    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
      if (response.status === 200) {
        // a 200 is expected for a successful update
        message.textContent = "The experience entry was updated.";
      } else {
        // a 201 is expected for a successful create
        message.textContent = "The experience entry was created.";
      }

      company.value = "";
      position.value = "";
      status.value = "pending";
      showExperiences();
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
} else if (e.target === editCancel) {
      message.textContent = "";
      showExperiences();
    }
  }
});
};


 
export const showAddEdit = async (experienceId) => {
  if (!experienceId) {
    company.value = "";
    position.value = "";
    status.value = "pending";
    addingExperience.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/experiences/${experienceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        company.value = data.experience.company;
        position.value = data.experience.position;
        status.value = data.experience.status;
        addingExperience.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = experienceId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The experiences entry was not found";
        showExperiences();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showExperiences();
    }

    enableInput(true);
  }
};