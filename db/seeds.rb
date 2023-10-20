# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
    puts "Destroying tables..."
    Server.destroy_all
    User.destroy_all
    Channel.destroy_all
    Message.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('user_servers')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('messages')

    puts "Creating users..."
    User.create!(
      username: 'demo.lition',
      email: 'demo@user.io',
      password: 'password',
      bio: "I'm a demo!",
      pronouns: 'they/them',
      avatar_url: 'https://i.imgur.com/n0X85nw.png'
    )

    avatars = [
      'https://i.imgur.com/AUtot3G.png',
      'https://i.imgur.com/wMNiO1v.png',
      'https://i.imgur.com/v6feagM.png',
      'https://i.imgur.com/h7JM2Gm.png',
      'https://i.imgur.com/Bczd46N.png',
      'https://i.imgur.com/fDMfeJ5.png'
    ]

    10.times do
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        bio: "Hi, I'm new to dupecord. Please be nice to me :)",
        pronouns: 'they/them',
        avatar_url: avatars.sample
      })
    end

    puts "Creating servers..."
      Server.create! [
        { name: "Demo's Server", owner_id: 1 , server_icon: 'https://i.imgur.com/AUtot3G.png'},
        { name: "random", owner_id: 2 },
        { name: "Gaming", owner_id: 3 , server_icon: 'https://i.imgur.com/RP0LYqf.jpg'},
        { name: "~music~", owner_id: 4 },
        { name: "Education!", owner_id: 5 },
      ]

    puts "Creating server membership..."
      UserServer.create! [
        { user_id: 1, server_id: 1 },
        { user_id: 1, server_id: 2 },
        { user_id: 1, server_id: 3 },
        { user_id: 2, server_id: 1 },
        { user_id: 2, server_id: 2 },
        { user_id: 3, server_id: 1 },
        { user_id: 3, server_id: 2 },
        { user_id: 3, server_id: 3 },
        { user_id: 4, server_id: 1 },
        { user_id: 4, server_id: 3 },
        { user_id: 4, server_id: 4 },
        { user_id: 5, server_id: 2 },
        { user_id: 5, server_id: 4 },
        { user_id: 5, server_id: 5 },
      ]

    puts "Creating channels..."
      Channel.create! [
        { server_id: 1, category: "General", name: "General" },
        { server_id: 1, category: "General", name: "off-topic" },
        { server_id: 1, category: "Resources", name: "Coding Resources" },
        { server_id: 2, category: "General", name: "random" },
        { server_id: 2, category: "General", name: "boba" },
        { server_id: 3, category: "General", name: "General" },
        { server_id: 3, category: "Game Suggestions", name: "Visual Novels" },
        { server_id: 3, category: "Game Suggestions", name: "Online Multiplayer" },
        { server_id: 3, category: "Game Suggestions", name: "RPGs" },
        { server_id: 4, name: "General", category: "General" },
        { server_id: 4, name: "Genres", category: "Kpop" },
        { server_id: 4, name: "Genres", category: "Pop" },
        { server_id: 4, name: "Genres", category: "Other" },
        { server_id: 5, name: "General", category: "General" },
        { server_id: 5, name: "Coding", category: "JavaScript" },
        { server_id: 5, name: "Coding", category: "Ruby" },
        { server_id: 5, name: "Coding", category: "General" },
        { server_id: 5, name: "Coding", category: "General" },
      ]

      puts "Creating messages..."
      Message.create! [
        { content: "hey all, what's up", user_id: 1, messageable_type: 'Channel', messageable_id: 1 },
        { content: "is anyone there?", user_id: 1, messageable_type: 'Channel', messageable_id: 1 },
        { content: "yo, someone please reply T_T", user_id: 1, messageable_type: 'Channel', messageable_id: 1 },
        { content: "dafjghdfkjg", user_id: 1, messageable_type: 'Channel', messageable_id: 1 },
        { content: "oh, hi", user_id: 2, messageable_type: 'Channel', messageable_id: 1 },
        { content: "i'm really craving boba", user_id: 3, messageable_type: 'Channel', messageable_id: 2 },
        { content: "me too", user_id: 4, messageable_type: 'Channel', messageable_id: 2 },
        { content: "me too", user_id: 1, messageable_type: 'Channel', messageable_id: 2 },
        { content: "me too", user_id: 2, messageable_type: 'Channel', messageable_id: 2 },
        { content: "me too", user_id: 3, messageable_type: 'Channel', messageable_id: 2 },
        { content: "leet code is pretty good", user_id: 2, messageable_type: 'Channel', messageable_id: 3 },
        { content: "freecodecamp", user_id: 4, messageable_type: 'Channel', messageable_id: 3 },
        { content: "yooo app academy tho", user_id: 1, messageable_type: 'Channel', messageable_id: 3 },
        { content: "i like odin project BE THE THOR OF CODING", user_id: 3, messageable_type: 'Channel', messageable_id: 3 },
        { content: "wth", user_id: 4, messageable_type: 'Channel', messageable_id: 3 },
        { content: "WEEEEEE RANDOM", user_id: 2, messageable_type: 'Channel', messageable_id: 4 },
        { content: "UwU", user_id: 3, messageable_type: 'Channel', messageable_id: 4 },
        { content: "boba", user_id: 3, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 1, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 5, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 2, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 3, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 1, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 5, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 2, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 3, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 1, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 5, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 2, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 3, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 1, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 5, messageable_type: 'Channel', messageable_id: 5 },
        { content: "boba", user_id: 2, messageable_type: 'Channel', messageable_id: 5 },
        { content: "sorry guys, I'm still working on this server", user_id: 3, messageable_type: 'Channel', messageable_id: 6 },

      ]

    puts "Done!"
  end