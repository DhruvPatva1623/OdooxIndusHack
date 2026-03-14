import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from app.core.config import settings

OTP_EMAIL_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: 'DM Sans', Arial, sans-serif; background: #F5F4F8; padding: 32px 16px; }}
  .container {{ max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }}
  .header {{ background: linear-gradient(135deg, #7B4FD4, #5A32A3); padding: 32px; text-align: center; }}
  .header-logo {{ color: rgba(255,255,255,0.7); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }}
  .header h1 {{ color: #ffffff; font-size: 1.5rem; font-weight: 700; }}
  .body {{ padding: 36px 32px; }}
  .body h2 {{ font-size: 1.25rem; font-weight: 700; color: #1A1A2E; margin-bottom: 12px; }}
  .body p {{ font-size: 0.875rem; color: #5A5A7A; line-height: 1.6; margin-bottom: 24px; }}
  .otp-box {{ background: #EDE9FA; border-radius: 12px; padding: 28px 24px; text-align: center; margin: 24px 0; }}
  .otp-code {{ font-size: 2.5rem; font-weight: 700; color: #6C3FC5; letter-spacing: 0.4em; font-family: 'Courier New', monospace; }}
  .expiry {{ color: #9090A8; font-size: 0.75rem; margin-top: 12px; }}
  .warning {{ background: #FBF8E0; border-left: 3px solid #B5A642; padding: 12px 16px; border-radius: 6px; font-size: 0.8125rem; color: #5A5A7A; margin-top: 16px; }}
  .footer {{ padding: 20px 32px; border-top: 1px solid #E2E2EC; text-align: center; font-size: 0.75rem; color: #9090A8; }}
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">Warehouse Management</div>
      <h1>CoreInventory</h1>
    </div>
    <div class="body">
      <h2>Your Verification Code</h2>
      <p>Use the code below to <strong>{purpose_text}</strong>. This code expires in 10 minutes.</p>
      <div class="otp-box">
        <div class="otp-code">{otp}</div>
        <div class="expiry">⏱ Expires in 10 minutes</div>
      </div>
      <div class="warning">🔒 Never share this code. CoreInventory staff will never ask for it.</div>
    </div>
    <div class="footer">© 2024 CoreInventory. All rights reserved.</div>
  </div>
</body>
</html>"""

PURPOSE_TEXT_MAP = {
    "password_reset": "reset your password",
    "login_verification": "verify your login",
    "email_verification": "verify your email address",
}


def send_otp_email(to_email: str, otp: str, purpose: str = "password_reset") -> None:
    """Send OTP email with branded HTML template."""
    purpose_text = PURPOSE_TEXT_MAP.get(purpose, "verify your identity")

    msg = MIMEMultipart("alternative")
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email
    msg["Subject"] = f"CoreInventory — Your Verification Code"

    html_content = OTP_EMAIL_TEMPLATE.format(otp=otp, purpose_text=purpose_text)
    msg.attach(MIMEText(html_content, "html", "utf-8"))

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.ehlo()
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
