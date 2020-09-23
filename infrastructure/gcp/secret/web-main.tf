resource "google_secret_manager_secret" "web_main_env" {
  provider  = google-beta
  secret_id = "web_main_env"

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
    }
  }
}
