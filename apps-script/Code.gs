/**
 * Contact-form backend for theonenonlyvj/personal-site.
 * Receives a POST from the site's contact form and appends one row to the
 * bound Google Sheet. Deploy this as a Web App (see README.md), then paste the
 * /exec URL into src/config.ts (CONTACT_ENDPOINT).
 */

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // Honeypot: bots fill "company"; humans never see it. Drop silently.
    if (p.company) {
      return json_({ ok: true });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // First run: write a header row.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Reach me back', 'Message']);
    }

    sheet.appendRow([
      new Date(),
      (p.name || '').toString().slice(0, 200),
      (p.contact || '').toString().slice(0, 200),
      (p.message || '').toString().slice(0, 5000),
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Optional: lets you open the /exec URL in a browser to confirm it's live.
function doGet() {
  return json_({ ok: true, service: 'contact-form' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
