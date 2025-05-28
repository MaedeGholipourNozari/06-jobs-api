import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";
import { deleteExperience } from "./deleteExperience.js";

let experiencesDiv = null;
let experiencesTable = null;
let experiencesTableHeader = null;

export const handleExperiences = () => {
  experiencesDiv = document.getElementById("experiences");
  const logoff = document.getElementById("logoff");
  const addExperience = document.getElementById("add-experience");
  experiencesTable = document.getElementById("experiences-table");
  experiencesTableHeader = document.getElementById("experiences-table-header");

  experiencesDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addExperience) {
        showAddEdit(null);
      }else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      }else if (e.target.classList.contains("deleteButton")) {
        message.textContent = "";
        const experienceId =e.target.dataset.id;
        deleteExperience(experienceId);
      } else if (e.target === logoff) {
        setToken(null);

        message.textContent = "You have been logged off.";

        experiencesTable.replaceChildren([experiencesTableHeader]);

        showLoginRegister(); 
      }
    }
  });
};

export const showExperiences = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/experiences", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [experiencesTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        experiencesTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.experiences.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.experiences[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.experiences[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.experiences[i].company}</td>
            <td>${data.experiences[i].position}</td>
            <td>${data.experiences[i].status}</td>
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        experiencesTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(experiencesDiv);
};

