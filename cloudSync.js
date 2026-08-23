const CLOUD_API_URL = "https://jsonbin.io";
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
}// Permanent Form Submission Handler for your Note Input Tray
window.addNewNote = async function(event) {
    // 1. Prevent native form navigation reload
    event.preventDefault();

    // 2. Extract DOM values exactly matching your index.html attributes
    const activeFacSelect = document.getElementById('n-fac-id');
    const txtInput = document.getElementById('n-text');

    if (!activeFacSelect || !txtInput) {
        console.error("❌ UI Linkage Mismatch: Required input tracking elements not found.");
        return;
    }

    const noteText = txtInput.value.trim();
    const activeFacId = activeFacSelect.value;

    // Validation Guard Check
    if (!noteText) {
        alert("Please enter note details before saving.");
        return;
    }

    // 3. Process localized database sync using structural parameter matching
    if (typeof mockFacilities !== 'undefined' && activeFacId) {
        const targetedFac = mockFacilities.find(f => f.id == activeFacId);

        if (targetedFac) {
            if (!targetedFac.notes) targetedFac.notes = [];

            // Add the note payload into array tracking memory
            targetedFac.notes.push({
                text: noteText,
                timestamp: new Date().toISOString()
            });

            // Clean the visual text box frame instantly for subsequent entries
            txtInput.value = '';

            // 4. Repaint timeline screen interface layout matching your 6px specifications
            if (typeof filterNotesByFacility === 'function') {
                filterNotesByFacility();
            }

            // 5. Commit to cloud storage backend via your cloudSync.js API function
            if (typeof updatePortalDatabase === 'function') {
                try {
                    console.log("⏳ Syncing updated array payload directly to jsonbin.io...");
                    await updatePortalDatabase(mockFacilities);
                } catch (error) {
                    console.error("⚠️ Local layout updated, but cloud broadcast transaction failed:", error);
                }
            } else {
                console.warn("⚠️ API Broadcaster missing: 'updatePortalDatabase' function unavailable globally.");
            }

        } else {
            console.error(`❌ Data Match Failure: Facility ID "${activeFacId}" not present in active schema.`);
        }
    } else {
        console.error("❌ Runtime State Core Fault: Global infrastructure 'mockFacilities' is uninitialized.");
    }
};

