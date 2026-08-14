const CLOUD_API_URL = "https://api.jsonbin.io/v3/b/6a7f520af5f4af5e29170934";
const MASTER_KEY = "$2a$10$u9FEMu6Tf2efPdqxEntoKOLlZYYxzpTzjM7L91vlKQD0gFpY/bEkC";

async function readPortalDatabase() {
  try {
    const response = await fetch(`${CLOUD_API_URL}/latest`, {
      method: "GET",
      headers: {
        "X-Master-Key": MASTER_KEY,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.record;
  } catch (error) {
    console.error("Failed to read database:", error);
  }
}

async function updatePortalDatabase(newDatabaseState) {
  try {
    const response = await fetch(CLOUD_API_URL, {
      method: "PUT",
      headers: {
        "X-Master-Key": MASTER_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDatabaseState)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Database synced successfully!");
    return result;
  } catch (error) {
    console.error("Failed to update database:", error);
  }
}
