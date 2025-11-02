export interface SystemEmailTemplateData {
  userName: string;
  personalEmail: string;
  domainEmail: string;
  verificationUrl: string;
  appName: string;
}

export function getDomainEmailVerificationHtmlTemplate(data: SystemEmailTemplateData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333; margin: 0;">Velkommen til ${data.appName}!</h1>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <p>Hei <strong>${data.userName}</strong>,</p>
        
        <p>Takk for at du registrerte deg med e-postadressen: <strong>${data.personalEmail}</strong></p>
        
        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold;">Din nye innloggings-e-post:</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; color: #007bff;">${data.domainEmail}</p>
        </div>
        
        <p>For å fullføre registreringen og aktivere din nye e-post, vennligst verifiser din e-postadresse ved å klikke på knappen under:</p>
        
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
        
        <p><strong>Viktig:</strong> Etter verifisering vil du bruke <strong>${data.domainEmail}</strong> for å logge inn på ${data.appName}.</p>
        
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

export function getDomainEmailVerificationTextTemplate(data: SystemEmailTemplateData) {
  return `
Velkommen til ${data.appName}!

Hei ${data.userName},

Takk for at du registrerte deg med e-postadressen: ${data.personalEmail}

Din nye innloggings-e-post vil være: ${data.domainEmail}

For å fullføre registreringen og aktivere din nye e-post, vennligst verifiser din e-postadresse ved å åpne følgende lenke:

${data.verificationUrl}

Viktig: Etter verifisering vil du bruke ${data.domainEmail} for å logge inn på ${data.appName}.

Denne lenken utløper om 1 time.

Med vennlig hilsen,
${data.appName}-teamet
  `.trim();
}
