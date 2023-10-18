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
    Server.destroy_all
    Channel.destroy_all
    UserServer.destroy.all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating users..."
    User.create!(
      username: 'demo.lition',
      email: 'demo@user.io',
      password: 'password',
      bio: "I'm a demo!",
      pronouns: 'they/them',
      avatar_url: 'https://i.imgur.com/n0X85nw.png'
    )

    10.times do
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        bio: "Hi, I'm new to dupecord. Please be nice to me :)",
        pronouns: 'they/them',
        avatar_url: 'https://i.imgur.com/v6feagM.png'
      })
    end

    puts "Creating servers..."
      Server.create!(
        name: "Demo Server",
        owner_id: 1,
        server_icon: 'https://i.imgur.com/AUtot3G.png'
      )
      Server.create!(
        name: "random server",
        owner_id: 2
      )
      Server.create!(
        name: "Gaming",
        owner_id: 3,
        server_icon: 'https://i.imgur.com/RP0LYqf.jpg'
        #image by Leo Alexandre
      )
      Server.create!(
        name: "Music",
        owner_id: 4,
        server_icon: 'https://i.imgur.com/Jq9YXPm.jpg'
      )
      Server.create!(
        name: "Education",
        owner_id: 5
      )

      puts "Creating server membership..."
      UserServer.create!(
        user_id: 1,
        server_id: 2,
      )
      UserServer.create!(
        user_id: 2,
        server_id: 1,
      )
      UserServer.create!(
        user_id: 1,
        server_id: 3,
      )
      UserServer.create!(
        user_id: 3,
        server_id: 1,
      )
      UserServer.create!(
        user_id: 3,
        server_id: 2,
      )
      UserServer.create!(
        user_id: 4,
        server_id: 1,
      )
      UserServer.create!(
        user_id: 5,
        server_id: 4,
      )
      UserServer.create!(
        user_id: 5,
        server_id: 2,
      )

      puts "Creating channels..."
        Channel.create!(
          server_id: 1,
          name: "General",
          category: "General",
        )
        Channel.create!(
          server_id: 1,
          name: "off-topic",
          category: "General",
        )
        Channel.create!(
          server_id: 1,
          name: "Coding Resources",
          category: "Resources",
        )
        Channel.create!(
          server_id: 2,
          name: "random",
          category: "General",
        )
        Channel.create!(
          server_id: 2,
          name: "boba",
          category: "General",
        )
        Channel.create!(
          server_id: 3,
          name: "General",
          category: "General",
        )
        Channel.create!(
          server_id: 3,
          name: "Visual Novels",
          category: "Game Suggestions",
        )
        Channel.create!(
          server_id: 3,
          name: "Online Multiplayer",
          category: "Game Suggestions",
        )
        Channel.create!(
          server_id: 3,
          name: "RPGs",
          category: "Game Suggestions",
        )
        Channel.create!(
          server_id: 4,
          name: "General",
          category: "General",
        )
        Channel.create!(
          server_id: 4,
          name: "Pop",
          category: "Genres",
        )
        Channel.create!(
          server_id: 4,
          name: "Kpop",
          category: "Genres",
        )
        Channel.create!(
          server_id: 4,
          name: "Other",
          category: "Genres",
        )
        Channel.create!(
          server_id: 5,
          name: "General",
          category: "General",
        )
        Channel.create!(
          server_id: 5,
          name: "JavaScript",
          category: "Coding",
        )
        Channel.create!(
          server_id: 5,
          name: "Ruby",
          category: "Coding",
        )

    puts "Done!"
  end