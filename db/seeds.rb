# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
    puts "Destroying tables..."
    User.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating users..."
    User.create!(
      username: 'demo.lition',
      email: 'demo@user.io',
      password: 'password',
      bio: "I'm a demo!",
      pronouns: 'they/them',
      avatar_url: 'https://i.imgur.com/ZrXLyz7.png'
    )

    10.times do
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        bio: "Hi, I'm new to dupecord. Please be nice to me :)",
        pronouns: 'they/them',
        avatar_url: 'https://i.imgur.com/WDdqBK4.png'
      })
    end

    puts "Creating servers..."
      Server.create!(
        name: "Demo Server",
        owner_id: 1,
        icon_url: 'https://i.imgur.com/7kLrpry.png'
      )

    puts "Done!"
  end