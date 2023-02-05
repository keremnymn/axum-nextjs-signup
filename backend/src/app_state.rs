use crate::database::ConnectionPool;

#[derive(Clone)]
pub struct AppState {
    pub db: ConnectionPool,
}
