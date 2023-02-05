use crate::app_state::AppState;
use crate::routes::users::sign_up::sign_up;
use axum::{routing::post, Router};
use tower_http::cors::CorsLayer;

pub fn create_router(app_state: AppState) -> Router {
    Router::new()
        .route("/api/users/sign-up", post(sign_up))
        .with_state(app_state)
        .layer(CorsLayer::permissive())
}
