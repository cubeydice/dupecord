json.user do
    json.extract! @user, :id, :email, :username, :bio, :avatar_url, :pronouns, :created_at, :updated_at
end