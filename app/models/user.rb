# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  avatar_url      :string
#  status          :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  bio             :string
#  pronouns        :string
#
class User < ApplicationRecord
  before_validation :ensure_session_token
  has_secure_password

  validates :username,
    length: { in: 2..32 },
    uniqueness: true,
    #FIX: MESSAGE
    format: { with: /\A(?!.*\.\.)[a-z0-9._]+\z/, message: "1" }
  validates :email,
    length: { in: 3..255 },
    uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 8..255 }, allow_nil: true

  has_many :owned_servers,
  foreign_key: :owner_id,
  class_name: :Server

  has_many :user_servers

  has_many :servers,
  through: :user_servers

  def self.find_by_credentials(credential, password)
    if credential =~ URI::MailTo::EMAIL_REGEXP
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

		user && user.authenticate(password) ? user : nil
  end

  def reset_session_token!
		self.session_token = generate_unique_session_token
		self.save!
		self.session_token
	end

  private
  def generate_unique_session_token
    while true
      token = SecureRandom::urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
