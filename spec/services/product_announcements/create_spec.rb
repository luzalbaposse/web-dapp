require "rails_helper"

RSpec.describe ProductAnnouncements::Create do
  let(:params) do
    {
      content: "We're excited to announce the launch of our latest feature: Career Goals.",
      link: "https://www.google.com",
      title: "New Support Model"
    }
  end

  subject(:create_product_announcement) { described_class.new(params:).call }

  describe "#call" do
    it "creates a product announcement" do
      expect { create_product_announcement }.to change { ProductAnnouncement.count }.by(1)

      product_announcement = ProductAnnouncement.last

      aggregate_failures do
        expect(product_announcement.content).to eq(params[:content])
        expect(product_announcement.link).to eq(params[:link])
        expect(product_announcement.title).to eq(params[:title])
      end
    end

    context "when the params are not valid" do
      let(:params) do
        {content: "We're excited to announce the launch of our latest feature: Career Goals."}
      end

      it "raises an error" do
        expect { create_product_announcement }
          .to raise_error(
            described_class::CreationError,
            "Unable to create product announcement. Errors: Title can't be blank"
          )
      end
    end
  end
end
