export interface VerifyEmailTemplateData {
  userName: string;
  verificationUrl: string;
  appName: string;
}

export function getVerifyEmailHtmlTemplate(data: VerifyEmailTemplateData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333; margin: 0;">Velkommen til ${data.appName}!</h1>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <p>Hei <strong>${data.userName}</strong>,</p>
        
        <p>Takk for at du registrerte deg. For å fullføre registreringen, vennligst verifiser din e-postadresse ved å klikke på knappen under:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.verificationUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; 
                    border-radius: 5px; display: inline-block; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Verifiser e-post
          </a>
        </div>
        
        <p style="text-align: center;">Eller kopier denne lenken inn i nettleseren din:</p>
        <p style="text-align: center; word-break: break-all; color: #666; background-color: #eee; padding: 10px; border-radius: 4px;">
          <a href="${data.verificationUrl}" style="color: #007bff;">${data.verificationUrl}</a>
        </p>
        
        <p>Denne lenken utløper om 1 time.</p>
      </div>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      
      <p style="color: #999; font-size: 14px; text-align: center;">
        Med vennlig hilsen,<br>
        ${data.appName}-teamet
      </p>
    </div>
  `;
}

export function getVerifyEmailTextTemplate(data: VerifyEmailTemplateData) {
  return `
Velkommen til ${data.appName}!

Hei ${data.userName},

Takk for at du registrerte deg. For å fullføre registreringen, vennligst verifiser din e-postadresse ved å åpne følgende lenke:

${data.verificationUrl}

Denne lenken utløper om 1 time.

Med vennlig hilsen,
${data.appName}-teamet
  `.trim();
}
