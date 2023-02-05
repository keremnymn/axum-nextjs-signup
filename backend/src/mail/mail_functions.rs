use dotenv::dotenv;
use lettre::{
    message::{header, SinglePart},
    transport::smtp::authentication::Credentials,
    Message, SmtpTransport, Transport,
};
use serde::Deserialize;
use std::{env, error::Error};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct EmailFields {
    subject: String,
    button_key: (String, String),
    icon: [String; 2],
    title: (String, String),
    main_text: (String, String),
    hidden_text: (String, String),
    generic_message_1: (String, String),
    generic_message_2: (String, String),
    generic_message_3: (String, String),
    generic_message_4: (String, String),
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct MainItems {
    confirm_mail: EmailFields,
    // reset_password: EmailFields, <- not implemented
}

struct EmailItem {
    template: String,
    subject: String,
}

#[derive(Debug, Copy, Clone)]
pub enum EmailTypes {
    ConfirmMail,
    ResetPassword, // not implemented
}

pub async fn mail_tls(email_type: EmailTypes, receiver: &str) {
    dotenv().ok();
    let email_object: EmailItem = get_template().await.unwrap();

    let smtp_username = env::var("SMTP_USERNAME").unwrap();
    let smtp_password = env::var("SMTP_PASSWORD").unwrap();
    let sender = format!("{} <{}>", env::var("SENDER").unwrap(), &smtp_username);

    let email = Message::builder()
        .from(sender.parse().unwrap())
        .to(receiver.parse().unwrap())
        .subject(email_object.subject)
        .singlepart(
            SinglePart::builder()
                .header(header::ContentType::TEXT_HTML)
                .body(email_object.template),
        )
        .unwrap();

    let creds = Credentials::new(smtp_username, smtp_password);

    // Open a remote connection to gmail
    let mailer = SmtpTransport::relay("smtp.gmail.com")
        .unwrap()
        .credentials(creds)
        .build();

    // Send the email
    match mailer.send(&email) {
        Ok(_) => println!(
            "{:?} has been sent to {1} successfully!",
            email_type, receiver
        ),
        Err(e) => panic!("Could not send email: {:?}", e),
    }
}

async fn get_template() -> Result<EmailItem, Box<dyn Error>> {
    let email_information_str = tokio::fs::read_to_string("./src/mail/mail_info.json").await?;

    let email_information: MainItems =
        serde_json::from_str(&email_information_str).expect("sıkıntı2");
    drop(email_information_str);

    let email_information = email_information.confirm_mail;

    let styles_to_be_replaced = [
        ["**-clr-background-**", "#0D3D56"],
        ["**-clr-primary-**", "#556cd6"],
        ["**-clr-secondary-**", "#19857b"],
        [&email_information.icon[0], &email_information.icon[1]],
    ];

    let to_be_replaced = [
        &email_information.button_key,
        &email_information.title,
        &email_information.main_text,
        &email_information.hidden_text,
        &email_information.generic_message_1,
        &email_information.generic_message_2,
        &email_information.generic_message_3,
        &email_information.generic_message_4,
    ];

    let mut template = tokio::fs::read_to_string("./src/mail/mail_template.html").await?;

    for item in styles_to_be_replaced {
        template = template.replace(item[0], item[1]);
    }
    drop(styles_to_be_replaced);

    for item in to_be_replaced {
        template = template.replace(&item.0, &item.1)
    }
    drop(to_be_replaced);

    let email_item: EmailItem = EmailItem {
        template,
        subject: email_information.subject,
    };

    Ok(email_item)
}
