# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

# Transform keys in responses for use with JavaScript
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true