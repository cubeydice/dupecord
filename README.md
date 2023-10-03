# Feature List
dupecord, a discord clone

## 1. User Authentication and Management:
- User registration and login.
- User profiles with avatars and status.
- Password reset and email verification.

## 2. Real-time Messaging:
Text-based channels for group and private messaging
- Support for multimedia content sharing (images, videos, files).
- Emojis and reactions.
- Markdown or rich-text formatting for messages. (if time)
- Message history and search functionality.

## 3. Server and Channel Management:
Creation of servers (communities) by users.
- Custom server names and avatars.
- Text and voice channels within servers.
- Role-based permissions for server members.
- Server moderation tools (kick, ban, mute).
- Server announcements and notifications.

## Notifications and Customization:
Customizable notification settings per server and channel.
- Push notifications on mobile and desktop.
- Notification sounds and mentions.

## 4. Friendship and Social Features:
Friend requests and friend lists.
- Private direct messaging between friends.
- Activity feed to see friends' online status and activity.
- User presence indicators (online, idle, offline).

## 5. Administration and Management:
Admin dashboard for server management and analytics.
- User reporting and moderation tools.
- Compliance with legal and regulatory requirements.

# Schema
## users
| column name       | data type | constraints               |
|-------------------|-----------|---------------------------|
| `id`              | bigint    | not null, primary key     |
| `username`        | string    | not null, unique, indexed |
| `email`           | string    | not null, unique, indexed |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, unique, indexed |
| `avatar_url`      | string    |                           |
| `created_at`      | datetime  | not null, default NOW()   |
- index on `username, unique: true`
- index on `email, unique: true`
- `has_many :servers, through :server, class_name :user_server`
- `belongs_to :server`
- `has_many :messages`

## servers
| column name  | data type | constraints                |
|--------------|-----------|----------------------------|
| `id`         | bigint    | not null, primary key      |
| `name`       | string    | not null                   |
| `owner_id`   | bigint    | not null, indexed          |
| `icon_url`   | string    |                            |
| `created_at` | datetime  | not null, default NOW()    |
- `has_many :users`
- `has_many :channels`
- `has_many :moderators, through :moderator`
## user_server
| column name | data type | constraints           |
|-------------|-----------|-----------------------|
| `id`        | bigint    | not null, primary key |
| `user_id`   | bigint    | not null, indexed     |
| `server_id` | bigint    | not null, indexed     |
- `belongs_to :server`
- `belongs_to :moderator`
- index on `[:server_id, :user_id], unique: true`
## channels
| column name | data type | constraints             |
|-------------|-----------|-------------------------|
| `id`        | bigint    | not null, primary key   |
| `server_id` | bigint    | not null                |
| `name`      | string    | not null                |
| `type`      | string    | not null                |
| `created_at`| datetime  | not null, default NOW() |
- `belongs_to :server`
- `has_many :messages`
## messages
| column name  | data type | constraints             |
|--------------|-----------|-------------------------|
| `id`         | bigint    | not null, primary key   |
| `user_id`    | bigint    | not null                |
| `channel_id` | bigint    | not null                |
| `content`    | text      | not null                |
| `created_at` | datetime  | not null, default NOW() |
- `belongs_to :user`
- `belongs_to :channel`
# Sample State
```
{ entities: {
  users: {
    1: { id: 1,
    username: "dupe",
    email: "dupe@example.com",
    avatar_url: "./avatar.png",
    created_at: "2023-09-28T12:00:00Z",
    },
    2: { id: 2,
    username: "dupette",
    email: "dupette@example.com",
    avatar_url: "./avatar2.png",
    created_at: "2023-09-28T12:00:00Z",
    }
  },
  servers: {
    1: {
      id: 1,
      name: "Sample Server",
      owner_id: 1,
      icon_url: "./server_icon.png",
      created_at: "2023-09-28T12:00:00Z",
    },
  },
  userServers: {
    1: {
      user_id: 1,
      server_id: 1,
    },
    2: {
    user_id: 2,
    server_id: 1,
    },
  },
  channels: {
    1: {
      id: 1,
      server_id: 1,
      name: "general",
      type: "text",
      created_at: "2023-09-28T12:00:00Z",
    },
    2: {
      id: 2,
      server_id: 1,
      name: "voice",
      type: "voice",
      created_at: "2023-09-28T12:00:00Z",
    }
  },
  messages: {
    1: {
      id: 1,
      user_id: 1,
      channel_id: 1,
      content: "Hello, world!",
      created_at: "2023-09-28T12:05:00Z",
    },
  },
}
}
```