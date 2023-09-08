require "google_drive/galxe/upload_wallet_addresses"

class Galxe::UploadWalletAddressesJob < ApplicationJob
  queue_as :default

  def perform
    GoogleDrive::Galxe::UploadWalletAddresses.new.call
  end
end
