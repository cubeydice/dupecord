module Messageable
    extend ActiveSupport::Concern

    included do
      has_many :messages,
      as: :messageable,
      dependent: :destroy
    end

    def receive_message(content)
      self.messages.find_or_create_by(content: content)
    end
  end
