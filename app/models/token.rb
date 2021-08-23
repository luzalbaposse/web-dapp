class Token < ApplicationRecord
  belongs_to :talent
  has_many :transactions

  TAL_VALUE = 2

  def display_ticker
    "$#{ticker}"
  end

  def display_price
    "$#{(price.to_f / 100).to_s(:delimited)}"
  end

  def display_market_cap
    "$#{calculate_market_cap.truncate(3).to_s(:delimited)}"
  end

  def calculate_market_cap
    (price.to_f / 100) * transactions.sum(:amount)
  end

  def price_in_tal
    @price_in_tal ||=
      begin
        in_tal = (price * 1.0) / TAL_VALUE
        if in_tal > 1000
          return in_tal.truncate(3)
        else
          counter = 0
          truncate_index = 1
          in_tal.to_s.each_char do |c|
            truncate_index += 1

            if c != "0" || c != "."
              counter += 1
            end
            break if counter > 2
          end

          in_tal.truncate(truncate_index)
        end
      end
  end

  def display_price_in_tal
    "#{(price_in_tal.round(2)).to_s(:delimited)} ✦"
  end

  def value_in_tal(user)
    transactions.where(investor: user.investor).sum(&:amount) * price_in_tal
  end

  def display_value_in_tal(user)
    "#{value_in_tal(user).to_f.round(0).to_s(:delimited)} ✦"
  end

  def display_value(user)
    "$#{(transactions.where(investor: user.investor).sum(&:amount).to_f / 100).to_s(:delimited)}"
  end

  def for_user_view(user)
    {
      id: id,
      ticker: display_ticker,
      talentName: talent.username,
      profilePictureUrl: talent.profile_picture_url,
      amount: transactions.where(investor: user.investor).sum(&:amount),
      price: display_price,
      priceInTal: display_price_in_tal,
      value: display_value(user),
      valueInTal: display_value_in_tal(user),
      priceVariance7d: "0"
    }
  end
end