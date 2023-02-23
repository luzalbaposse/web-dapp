require "rails_helper"

RSpec.describe API::LogRequest, type: :model do
  subject { build :log_request }

  describe "associations" do
    it { is_expected.to belong_to(:api_key) }
  end
end
