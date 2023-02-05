use serde::{Deserialize, Serialize};
use validator::Validate;

use axum::{
    async_trait,
    body::HttpBody,
    extract::FromRequest,
    http::{Request, StatusCode},
    BoxError, Json, RequestExt,
};

#[derive(Serialize, Deserialize, Validate, Debug)]
pub struct RequestSignUp {
    #[validate(length(min = 1, max = 20))]
    pub firstname: String,
    #[validate(length(min = 1, max = 20))]
    pub lastname: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 1, max = 30))]
    pub password: String,
    #[validate(length(min = 4, max = 5))] // string boolean
    pub email_subscription: String,
}

#[async_trait]
impl<S, B> FromRequest<S, B> for RequestSignUp
where
    B: HttpBody + Send + 'static,
    B::Data: Send,
    B::Error: Into<BoxError>,
    S: Send + Sync,
{
    type Rejection = (StatusCode, String);

    async fn from_request(request: Request<B>, _state: &S) -> Result<Self, Self::Rejection> {
        let Json(user) = request
            .extract::<Json<RequestSignUp>, _>()
            .await
            .map_err(|error| (StatusCode::BAD_REQUEST, format!("{}", error)))?;

        if let Err(errors) = user.validate() {
            return Err((StatusCode::BAD_REQUEST, format!("{}", errors)));
        }

        Ok(user)
    }
}
