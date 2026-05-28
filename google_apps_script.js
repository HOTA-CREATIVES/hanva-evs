/**
 * HANWA EVS — Google Apps Script for Lead Capture
 *
 * Instructions:
 * 1. Open a Google Sheet.
 * 2. Click on "Extensions" -> "Apps Script".
 * 3. Delete any code in the editor and paste this code.
 * 4. Replace ADMIN_EMAIL with your email address in the configuration below.
 * 5. Click "Deploy" (top right) -> "New deployment".
 * 6. Select type "Web app".
 * 7. Set:
 *    - Description: Hanwa EVS Lead Capture
 *    - Execute as: Me (your-google-account)
 *    - Who has access: Anyone (this is critical so the website can post to it without login).
 * 8. Click "Deploy", authorize permissions, and copy the "Web app URL".
 * 9. Paste this URL into the `APPS_SCRIPT_URL` config in `src/firebase/config.ts`.
 */

// --- CONFIGURATION ---
const ADMIN_EMAIL = "haanaveviors@gmail.com"; // Change to your preferred admin notification email
const BRAND_NAME = "Hanwa EVS";
const COMPLEMENTARY_COLOR = "#D4AF37"; // Gold accent
const DARK_BG = "#0A0A0A"; // Dark luxury theme background
const LIGHT_BG = "#FAFAFA"; // Alabaster white theme text container
// ID of the Google Sheet to store leads. Replace if you want a different sheet.
const SHEET_ID = "1fvYLuRJWs4qA6C5lPGboES5BWq3BmF77RL0P4R4tnxA";
// Optional: specify a sheet name. Leave empty to use the first sheet.
const SHEET_NAME = "";

function doPost(e) {
  try {
    // Enable CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle OPTIONS preflight request
    if (e.parameter.method === "OPTIONS" || !e.postData) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", message: "CORS preflight ok" }),
      )
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers);
    }

    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    const name = data.name || "N/A";
    const email = data.email || "N/A";
    const phone = data.phone || "N/A";
    const service = data.service || "N/A";
    const message = data.message || "N/A";

    // 1. Store in Google Sheets
    // Prefer opening by ID (works for web app deployments). Fall back to active spreadsheet for container-bound usage.
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    } catch (err) {
      // If openById fails (for example during local testing in container-bound editor), fall back to active spreadsheet
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    }

    const sheet = SHEET_NAME
      ? spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0]
      : spreadsheet.getSheets()[0];

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Client Name",
        "Email Address",
        "Phone Number",
        "Service of Interest",
        "Message / Requirements",
      ]);
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setBackground("#111111");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Arial");
      sheet.setFrozenRows(1);
    }

    // Append user data
    sheet.appendRow([timestamp, name, email, phone, service, message]);
    sheet.autoResizeColumns(1, 6);

    // 2. Send Luxury HTML Confirmation to Responder
    if (email !== "N/A" && email.includes("@")) {
      sendResponderEmail(name, email, service);
    }

    // 3. Send Notification to Admin
    sendAdminEmail(name, email, phone, service, message, timestamp);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Lead recorded and notifications sent successfully.",
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
      });
  }
}

// Support GET requests for easy deployment testing
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "success",
      message:
        "Hanwa EVS Lead Capture Endpoint is active. Send a POST request to submit inquiries.",
    }),
  )
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
    });
}

function sendResponderEmail(name, email, service) {
  const subject = `Your Inquiry with ${BRAND_NAME} — Crafted Experiences & Elegant Spaces`;

  const htmlBody = `
    <div style="background-color: ${DARK_BG}; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #E5E5E5; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #222222; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- Header -->
        <div style="padding: 40px 30px; border-bottom: 1px solid #1A1A1A; background-color: #000000; text-align: center;">
          <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 300; letter-spacing: 4px; margin: 0; text-transform: uppercase; font-family: 'Playfair Display', Georgia, serif;">
            HANWA <span style="color: ${COMPLEMENTARY_COLOR}; font-weight: 400;">EVS</span>
          </h1>
          <p style="color: #888888; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 5px 0 0 0;">
            Events &amp; Interior Design
          </p>
        </div>

        <!-- Body Content -->
        <div style="padding: 40px 40px 30px 40px; text-align: left; line-height: 1.8;">
          <p style="font-size: 16px; color: #FFFFFF; font-weight: 400; margin-top: 0;">
            Dear ${name},
          </p>
          
          <p style="font-size: 14px; color: #CCCCCC;">
            Thank you for reaching out to <strong>${BRAND_NAME}</strong>. We are delighted to receive your inquiry regarding our <strong>${service}</strong> services. 
          </p>
          
          <p style="font-size: 14px; color: #CCCCCC;">
            At Hanwa EVS, we blend modern architectural aesthetics with meticulous execution to shape bespoke realities. Whether it is an extraordinary luxury event or a timeless interior space, our team is committed to crafting perfection.
          </p>
          
          <div style="background-color: #1A1A1A; border-left: 3px solid ${COMPLEMENTARY_COLOR}; padding: 15px 20px; margin: 25px 0; border-radius: 2px;">
            <p style="margin: 0; font-size: 13px; color: #AAAAAA; font-style: italic;">
              "Next Step: A designated luxury design consultant from our executive team is reviewing your requirements and will connect with you within 24 business hours to arrange a bespoke consultation."
            </p>
          </div>

          <p style="font-size: 14px; color: #CCCCCC;">
            In the meantime, feel free to explore our virtual portfolio or compile any design inspiration you would like to share with us during our call.
          </p>
          
          <p style="font-size: 14px; color: #888888; margin-bottom: 0; padding-top: 20px; border-top: 1px solid #1A1A1A;">
            Warm regards,<br>
            <strong style="color: #FFFFFF; font-weight: 500;">The Concierge Team</strong><br>
            <span style="color: ${COMPLEMENTARY_COLOR}; font-size: 12px; letter-spacing: 1px;">HANWA EVS</span>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #080808; padding: 25px 40px; text-align: center; border-top: 1px solid #111111; font-size: 11px; color: #555555; letter-spacing: 0.5px;">
          <p style="margin: 0 0 10px 0;">This email is confirmation of your digital inquiry.</p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} ${BRAND_NAME}. All Rights Reserved.</p>
        </div>

      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody,
    replyTo: ADMIN_EMAIL,
  });
}

function sendAdminEmail(name, email, phone, service, message, timestamp) {
  const subject = `🚨 NEW LEAD: ${name} — ${service} [${BRAND_NAME}]`;

  const htmlBody = `
    <div style="background-color: #F6F6F6; padding: 30px 15px; font-family: Arial, sans-serif; color: #333333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E0E0E0; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #111111; padding: 20px; color: #FFFFFF; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">
            New Lead Captured
          </h2>
          <span style="font-size: 12px; color: ${COMPLEMENTARY_COLOR}; letter-spacing: 1px;">${BRAND_NAME} Inquiry Pipeline</span>
        </div>

        <!-- Table Info -->
        <div style="padding: 25px 30px;">
          <p style="font-size: 14px; margin-top: 0; line-height: 1.5;">
            An elegant new inquiry has been captured through the <strong>${BRAND_NAME}</strong> landing page website and has been logged into the Google Sheet.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; font-weight: bold; width: 30%; color: #666666;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; color: #111111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; font-weight: bold; color: #666666;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; color: #111111;"><a href="mailto:${email}" style="color: #0066CC; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; font-weight: bold; color: #666666;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; color: #111111;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; font-weight: bold; color: #666666;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; color: ${COMPLEMENTARY_COLOR}; font-weight: bold;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; font-weight: bold; color: #666666;">Timestamp:</td>
              <td style="padding: 10px; border-bottom: 1px solid #EEEEEE; color: #777777;">${timestamp.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #666666; vertical-align: top;">Message:</td>
              <td style="padding: 10px; color: #333333; line-height: 1.6; background-color: #FAF9F6; border-radius: 4px;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}?subject=Regarding Your Inquiry with ${BRAND_NAME}" style="background-color: #111111; color: #FFFFFF; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: bold; letter-spacing: 0.5px; border: 1px solid ${COMPLEMENTARY_COLOR}; display: inline-block;">
              Reply Direct to Client
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #EAEAEA; padding: 15px; text-align: center; font-size: 11px; color: #777777;">
          This message is automatically generated and sent to the administrator of ${BRAND_NAME}.
        </div>

      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
  });
}
