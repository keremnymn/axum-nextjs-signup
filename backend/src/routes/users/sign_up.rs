// use crate::{internal_error, ConnectionPool};
use axum::{extract::State, http::StatusCode};

use crate::{
    app_state::AppState,
    base_functions::truth_value,
    database::internal_error,
    mail::mail_functions::{mail_tls, EmailTypes},
};

use super::{hash_password::hash_password, structs::RequestSignUp};

pub async fn sign_up(
    State(pool): State<AppState>,
    input: RequestSignUp,
) -> Result<(), (StatusCode, String)> {
    let conn = pool.db.get().await.map_err(internal_error)?;
    let email_subscription = truth_value(&input.email_subscription);

    conn.execute(
        "insert into \"user\" (
                firstname, lastname, email, password, email_subscription
            ) values($1, $2, $3, $4, cast($5 as boolean));",
        &[
            &input.firstname,
            &input.lastname,
            &input.email,
            &hash_password(&input.password).await.unwrap(),
            &email_subscription,
        ],
    )
    .await
    .map_err(internal_error)?;

    mail_tls(EmailTypes::ConfirmMail, &input.email).await;

    Ok(())
}
