# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  content          :text
#  user_id          :bigint
#  messageable_type :string           not null
#  messageable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord
  belongs_to :messageable, polymorphic: true
end
