pub mod app_state;
mod base_functions;
pub mod database;
pub mod mail;
pub mod router;
pub mod routes;
use std::net::SocketAddr;

use app_state::AppState;
use database::start_database;

#[tokio::main]
async fn main() {
    let app_state = AppState {
        db: start_database().await,
    };
    let app = router::create_router(app_state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 5000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
