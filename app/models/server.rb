# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  owner_id    :bigint
#  icon_url    :string
#  invite_code :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord
    validates :name, presence: true

    belongs_to :owner,
    class_name: :User

    has_many :users,
    through: :user_servers
end