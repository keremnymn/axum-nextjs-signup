pub fn truth_value(value: &str) -> bool {
    match value {
        "true" | "t" => true,
        _ => false,
    }
}
