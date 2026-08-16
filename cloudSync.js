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
// Self-contained backup function triggered by your HTML button
window.exportToExcel = function() {
    try {
        // Pull the schedule table straight from your active screen view
        const table = document.querySelector("table") || 
                      document.querySelector(".tab-panel[style*='display: block'] table") || 
                      document.querySelector("#panel-facilities table");
        
        if (!table) {
            alert("Could not find the lecture matrix data table on the screen. Please click your 'Master Schedule Matrix' tab first, then try downloading again!");
            return;
        }

        // Loop through rows and columns to generate clean spreadsheet data
        let csvContent = "";
        for (let row of table.rows) {
            let rowData = [];
            for (let cell of row.cells) {
                // Escape quotes and wrap cell contents safely
                let text = cell.innerText.replace(/"/g, '""');
                rowData.push('"' + text + '"');
            }
            csvContent += rowData.join(",") + "\r\n";
        }

        // Create the file download completely locally (no internet required)
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        
        const dateStr = new Date().toISOString().slice(0, 10);
        link.setAttribute("download", `lecture_matrix_backup_${dateStr}.csv`);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (err) {
        alert("Backup failed: " + err.message);
    }
};
// This function forces the browser to read the button logic directly from this file
window.exportToExcel = function() {
    try {
        const table = document.querySelector("table") || 
                      document.querySelector(".tab-panel[style*='display: block'] table") || 
                      document.querySelector("#panel-facilities table");
        
        if (!table) {
            alert("Please click your Master Schedule Matrix tab first, then try downloading again!");
            return;
        }
        
        let csvContent = "";
        for (let i = 0; i < table.rows.length; i++) {
            let row = table.rows[i];
            let rowData = [];
            for (let j = 0; j < row.cells.length; j++) {
                let cell = row.cells[j];
                let cleanText = cell.innerText.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "");
                cleanText = cleanText.replace(/Primary:|Sent:|View Logs/gi, "").trim();
                cleanText = cleanText.replace(/"/g, '""');
                rowData.push('"' + cleanText + '"');
            }
            csvContent += rowData.join(",") + "\r\n";
        }
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const dateStr = new Date().toISOString().slice(0, 10);
        link.setAttribute("download", `lecture_matrix_backup_${dateStr}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (err) {
        alert("Backup error: " + err.message);
    }
};
