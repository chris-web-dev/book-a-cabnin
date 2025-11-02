export interface MagicLinkTemplateData {
  userName?: string;
  magicLinkUrl: string;
  appName: string;
}

export function getMagicLinkHtmlTemplate(data: MagicLinkTemplateData) {
  const greeting = data.userName ? `Hei <strong>${data.userName}</strong>,` : "Hei,";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333; margin: 0;">Magisk innloggingslenke</h1>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <p>${greeting}</p>
        
        <p>Klikk på knappen under for å logge inn:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.magicLinkUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; 
                    border-radius: 5px; display: inline-block; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Logg inn
          </a>
        </div>
        
        <p style="text-align: center;">Eller kopier denne lenken inn i nettleseren din:</p>
        <p style="text-align: center; word-break: break-all; color: #666; background-color: #eee; padding: 10px; border-radius: 4px;">
          <a href="${data.magicLinkUrl}" style="color: #007bff;">${data.magicLinkUrl}</a>
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

export function getMagicLinkTextTemplate(data: MagicLinkTemplateData) {
  const greeting = data.userName ? `Hei ${data.userName},` : "Hei,";

  return `
Magisk innloggingslenke

${greeting}

Klikk på følgende lenke for å logge inn:

${data.magicLinkUrl}

Denne lenken utløper om 1 time.

Med vennlig hilsen,
${data.appName}-teamet
  `.trim();
}
