# 🏢 SILL Select Portal Cluster — System Documentation

This repository hosts a live operational database tracking subscription sales for a 13-lecture series running annually from January to March. It provides a secure, streamlined pipeline tracking contract statuses, invoices, and active accounting ledger matrix processing loops.

## ⚙️ Core Architecture Profiles

### 1. Technology Infrastructure Stack
* **Frontend UI Engine:** Vanilla HTML5, CSS Grid Layouts, and responsive inline styles styled explicitly for widescreen rendering.
* **Database Backend Storage:** Managed remote MySQL tables integrated with a secure document store hosted on [JSONBin.io](https://jsonbin.io).
* **Network Pipeline Handler:** Asynchronous JavaScript pipeline modules managed inside `cloudSync.js` utilizing robust network state listeners.

### 2. Role Security Access Profile Matrix
* **Treasurer Profile:** Full read/write database synchronization privileges. Form inputs execute instant inline auto-saving hooks (`saveDataToCloud();`) immediately upon losing focus (`onblur`), processing an item selection alteration (`onchange`), or hitting keyboard `Enter`.
* **Board Member Profile:** View-Only monitoring dashboard wrapper access. Explicitly restricts data mutation via system-wide structural state injection rules (`isReadonly`). A top alert flag banner informs them changes will not persist.

---

## 📍 Key System Component Customizations

### 🖥️ Active Facilities Directory Inline Text Modification Engines
The main layout table workspace features custom flat, borderless interactive data cells inside `index.html` under the **Facility Info** layout container column. 

* **Targeted Values:** Name (`fac.name`), Location Address (`fac.address`), and Phone Number (`fac.phone`).
* **Visual Aesthetic State:** Completely transparent, zero padding offsets, border-free, and matched natively to structural typography sheets (`1.25rem`, `13px`, `12px` font steps). No layout text blocks shift pixels when interacting.
* **Database Synchronization Pipeline Flow:** Clicking directly into the field lets the Treasurer write changes. Shifting focus away or triggering keyboard `Enter` activates the loop below:

```javascript
// Example structural inline entry update script engine mapping
onblur="const m=mockFacilities.find(f=>f.id==='\${fac.id}'); if(m && m.name!==this.value){ m.name=this.value; saveDataToCloud(); }"
onkeypress="if(event.key==='Enter'){ this.blur(); }"
```

### 🔒 Navigation Control Back Arrow Interceptor Guard
To safeguard the Treasurer against accidental mouse movements, workspace drop closures, or losing state data during high-speed typing sessions, the system blocks native browser history movements:

```javascript
window.addEventListener('popstate', function(event) {
    window.history.pushState({ noBack: true }, '');
    alert("🔄 Portal Alert: Use the navigation tabs at the top of the dashboard to change pages...");
});
```

---

## 🗄️ Standard Maintenance Workflow Guide

When editing code layouts via the GitHub Web Workspace Editor, paste files sequentially using modular, broken-up snippets to prevent browser lag:
1. **Part 1:** System CSS rules, secure login card router wrappers, and layout workspace frames.
2. **Part 2:** Cloud synchronization API network handlers and security route controllers.
3. **Part 3:** Master schedule calendar grid mapping matrices and real-time interaction trackers.
4. **Part 4:** Main layout dashboard loop builders (`renderDashboard();`) and window state listener hooks.
