using System.Net.Mail;
using System.Net;
using System.Text;

namespace DemoTwo.Services
{
    public class Email
    {
        public void SendEmail(string toEmail, string username)
        {
            // Set up SMTP client
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("rkpayasingh@gmail.com", "rmuo audk jxcs yirf");

            // Create email message
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("rkpayasingh@gmail.com");
            mailMessage.To.Add(toEmail);
            mailMessage.Subject = "Regarding to Hotel Reservations";
            mailMessage.IsBodyHtml = true;
            StringBuilder mailBody = new StringBuilder();
            mailBody.AppendFormat("<h1>User Registered</h1>");
            mailBody.AppendFormat("<br />");
            mailBody.AppendFormat($"Dear {username}");
            mailBody.AppendFormat("<p>Thank you For Registering account</p>");
            mailMessage.Body = mailBody.ToString();

            // Send email
            client.Send(mailMessage);
        }

        public void SendEmail2(string toEmail, string username)
        {
            // Set up SMTP client
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("rkpayasingh@gmail.com", "rmuo audk jxcs yirf");

            // Create email message
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("rkpayasingh@gmail.com");
            mailMessage.To.Add(toEmail);
            mailMessage.Subject = "Reservation";
            mailMessage.IsBodyHtml = true;
            StringBuilder mailBody = new StringBuilder();
            mailBody.AppendFormat("<h3>Booking Successfully Done</h1>");
            mailBody.AppendFormat("<br />");
            mailBody.AppendFormat($"Dear {username}");
            mailBody.AppendFormat("<br />");
            mailBody.AppendFormat("<p>Payment successfully done.</p>");
            mailBody.AppendFormat("<p>Thank you for choosing us</p>");
            mailMessage.Body = mailBody.ToString();

            // Send email
            client.Send(mailMessage);
        }

    }
}