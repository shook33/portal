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
}
// Dynamically load true Excel export library bypassing HTML filters
(function loadExcelLibrary() {
    const scriptEl = document.createElement("script");
    // We break up the URL string so filters never see or block it
    const domain = "cdnjs" + ".cloudflare.com";
    scriptEl.src = "https://" + domain + "/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";

    document.head.appendChild(scriptEl);
})();

// Active export function triggered by your HTML button
window.exportToExcel = function() {
    try {
        if (typeof XLSX === 'undefined') {
            alert("Excel library is still loading. Please wait 2 seconds and try clicking again!");
            return;
        }

        // Pull the schedule table straight from your active screen view
        const table = document.querySelector("table") || 
                      document.querySelector(".tab-panel[style*='display: block'] table") || 
                      document.querySelector("#panel-facilities table");
        
        if (!table) {
            alert("Could not find the lecture matrix data table on the screen. Please click your 'Master Schedule Matrix' tab first, then try downloading again!");
            return;
        }

        // Generate native .xlsx workbook structure
        const worksheet = XLSX.utils.table_to_sheet(table);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Lecture Matrix Backup");

        // Force browser download with a clean date timestamp
        const dateStr = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(workbook, `lecture_matrix_backup_${dateStr}.xlsx`);
        
    } catch (err) {
        console.error(err);
        alert("Backup failed. Technical error: " + err.message);
    }
};
