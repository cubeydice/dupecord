# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  owner_id    :bigint
#  server_icon :string
#  invite_code :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord
    validates :name, presence: true

    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

    has_many :user_servers,
    dependent: :destroy

    has_many :users,
    through: :user_servers,
    dependent: :destroy

    has_many :channels,
    dependent: :destroy
end
