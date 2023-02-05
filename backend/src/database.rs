use axum::http::StatusCode;
use bb8::Pool;
use bb8_postgres::PostgresConnectionManager;
use dotenv::dotenv;
use tokio_postgres::NoTls;

pub async fn start_database() -> ConnectionPool {
    dotenv().ok();

    let database_string =
        std::env::var("DATABASE").expect("Please declare 'DATABASE' variable in the environment.");
    let manager = PostgresConnectionManager::new_from_stringlike(&database_string, NoTls).unwrap();

    Pool::builder().build(manager).await.unwrap()
}

pub type ConnectionPool = Pool<PostgresConnectionManager<NoTls>>;

pub fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    let error = err.to_string();
    if error.contains("unique constraint \"user_email_key\"") {
        (
            StatusCode::BAD_REQUEST,
            "The user might be already signed up".to_owned(),
        )
    } else {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            "An unknown error occurred.".to_owned(),
        )
    }
}
