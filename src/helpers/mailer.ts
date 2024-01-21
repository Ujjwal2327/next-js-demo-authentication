import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any)=>{

  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
      )
    }
    else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 },
      )
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"Ujjwal 👻" <${process.env.EMAIL}>`,
      to: email,
      subject: emailType==="VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your password"} or copy & paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</br></p>`
    }

    const mailResponse = await transport.sendMail(mailOptions);
    
    return mailResponse;
  }
  catch (error: any) {
    console.log(error)
    throw new Error(error.message);
  }

}