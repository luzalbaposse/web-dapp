class API::LogRequest < ApplicationRecord
  self.table_name = "api_log_requests"

  has_encrypted :ip
  blind_index :ip

  belongs_to :api_key, class_name: "API::Key"
end
