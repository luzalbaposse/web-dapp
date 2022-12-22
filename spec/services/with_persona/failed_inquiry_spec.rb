require "rails_helper"

RSpec.describe WithPersona::FailedInquiry do
  subject(:failed_inquiry) do
    described_class.new(talent: talent).call
  end

  let(:user) { create :user }
  let!(:talent) { create :talent, user: user, verified: false, with_persona_id: "123" }

  it "clears the with persona field" do
    failed_inquiry

    expect(talent.reload.with_persona_id).to eq nil
  end
end
