# == Schema Information
#
# Table name: user_servers
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  server_id  :bigint
#  group_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserServer < ApplicationRecord
    validates :user_id, presence: true
    validates :server_id, presence: true

    belongs_to :user
    belongs_to :server
end
