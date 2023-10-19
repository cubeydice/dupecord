# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  server_id  :bigint
#  name       :string           not null
#  category   :string
#  topic      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
    include Messageable

    validates :name, presence: true
    validates :topic, length: { maximum: 1024 }, allow_blank: true

    belongs_to :server
end
