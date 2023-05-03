require "rails_helper"

RSpec.describe "OAuth callbacks", type: :request do
  describe "#linkedin" do
    subject(:linkedin_login) { get auth_linkedin_callback_path(params) }

    let(:params) do
      {
        code: "linkedin-code",
        invite_code: "tp-invite"
      }
    end

    let(:login_class) { Linkedin::OauthHandler }
    let(:login) { instance_double(login_class, call: result) }

    let(:result) { {success: true} }

    before do
      allow(login_class).to receive(:new).and_return(login)
    end

    it "redirects to the homepage" do
      linkedin_login

      expect(response).to redirect_to(root_path)
      expect(flash).to be_empty
    end

    it "initialises and calls the login class with the correct arguments" do
      linkedin_login

      aggregate_failures do
        expect(login_class).to have_received(:new).with(code: "linkedin-code", invite_code: "tp-invite", utm_source: nil)

        expect(login).to have_received(:call)
      end
    end

    context "when the login class returns an unsuccessful response" do
      let(:result) { {success: false} }

      it "redirects to the homepage with an error message" do
        linkedin_login

        expect(response).to redirect_to(root_path)
        expect(flash[:error]).to eq "Failed LinkedIn login"
      end
    end
  end
end
