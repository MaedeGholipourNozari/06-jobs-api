import { token, message } from "./index.js";
import { showExperiences } from "./experiences.js";

export const deleteExperience = async (experienceId) => {
  if (confirm('Are you sure you want to delete this experience?')) {
    try {
      const response = await fetch(`/api/v1/experiences/${experienceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.textContent = "The experience entry was deleted.";
        showExperiences();
      } else {
        const data = await response.json();
        message.textContent = data.msg || "Failed to delete experience.";
      }
    } catch (err) {
      message.textContent = "A communication error occurred.";
    }
  }
};