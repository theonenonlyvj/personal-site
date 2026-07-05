# Contact form → your Google Sheet (setup)

The contact form on the site POSTs each message to a Google Apps Script "Web App"
that appends a row to a Sheet **you own**. No third party stores the data.
One-time setup, ~10 minutes. You never touch it again — just check the Sheet.

## Steps

1. **Make the Sheet.** Go to <https://sheets.new>, name it e.g. `personal-site — messages`.
2. **Open the script editor.** In that Sheet: **Extensions → Apps Script**.
3. **Paste the code.** Delete the starter `function myFunction(){}`, then paste the
   full contents of [`Code.gs`](./Code.gs). Click the **Save** (💾) icon.
3a. **Narrow the permissions (recommended).** In the script editor, click
   **Project Settings** (⚙️ left sidebar) → check **"Show `appsscript.json`
   manifest file in the editor."** Go back to the **Editor**, open `appsscript.json`,
   and replace its contents with [`appsscript.json`](./appsscript.json) from this
   folder. This limits the app to **only this one Sheet** — so the permission
   prompt says "the specific spreadsheet you use with this app" instead of "all
   your spreadsheets." Save.
4. **Deploy as a Web App.** Click **Deploy → New deployment**.
   - Click the ⚙️ gear → choose **Web app**.
   - **Description:** anything (e.g. `contact form`).
   - **Execute as:** **Me** (your account).
   - **Who has access:** **Anyone**. ← required so the public form can post.
   - Click **Deploy**. Approve the permissions prompt (it's your own script;
     "Advanced → Go to (unsafe)" is normal for personal Apps Scripts).
5. **Copy the Web app URL.** It looks like
   `https://script.google.com/macros/s/AKfy…LONG…/exec`. Give it to me (or paste it
   into `src/config.ts` as `CONTACT_ENDPOINT`). I'll deploy the site and the form
   goes live.

## Checking messages
Just open the Sheet. Each submission is a new row: `Timestamp | Name | Reach me back | Message`.
(Optional: **Tools → Notification settings** in the Sheet to get emailed when a row is added.)

## Notes
- A hidden "honeypot" field filters most bots; junk still slips through occasionally —
  that's the cost of a public form. Delete junk rows and move on.
- Changing `Code.gs` later? You must **Deploy → Manage deployments → edit → New version**
  for changes to take effect (editing the code alone doesn't redeploy).
- The `/exec` URL is safe to commit — it's a write-only endpoint, not a secret to your data.
