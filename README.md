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

# PostgreSQL Schema
## users
| column name       | data type | constraints               |
|-------------------|-----------|---------------------------|
| `id`              | bigint    | not null, primary key     |
| `username`        | string    | not null, unique, indexed |
| `email`           | string    | not null, unique, indexed |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, unique, indexed |
| `avatar_url`      | string    |                           |
| `created_at`      | datetime  | not null                  |
- index on `username, unique: true`
- index on `email, unique: true`
- `has_many :servers, through :server, class_name :user_server`
- `belongs_to :server`
- `has_many :messages`
- `has_many :direct_messages, through :friends`
## servers
| column name  | data type | constraints                |
|--------------|-----------|----------------------------|
| `id`         | bigint    | not null, primary key      |
| `name`       | string    | not null                   |
| `owner_id`   | bigint    | not null, indexed          |
| `icon_url`   | string    |                            |
| `created_at` | datetime  | not null                   |
- `has_many :users`
- `has_many :channels`
- `has_many :moderators, through :moderator`
## channels
| column name | data type | constraints             |
|-------------|-----------|-------------------------|
| `id`        | bigint    | not null, primary key   |
| `server_id` | bigint    | not null                |
| `name`      | string    | not null                |
| `type`      | string    | not null                |
| `created_at`| datetime  | not null                |
- `belongs_to :server`
- `has_many :messages`
## messages
| column name  | data type | constraints             |
|--------------|-----------|-------------------------|
| `id`         | bigint    | not null, primary key   |
| `user_id`    | bigint    | not null                |
| `channel_id` | bigint    | not null                |
| `content`    | text      | not null                |
| `created_at` | datetime  | not null                |
- `belongs_to :user`
- `belongs_to :channel`
## direct_messages
| column name  | data type | constraints             |
|--------------|-----------|-------------------------|
| `id`         | bigint    | not null, primary key   |
| `user_id`    | bigint    | not null                |
| `channel_id` | bigint    | not null                |
| `content`    | text      | not null                |
| `created_at` | datetime  | not null                |
- `belongs_to :user`

# Join Tables
## user_server
| column name | data type | constraints           |
|-------------|-----------|-----------------------|
| `id`        | bigint    | not null, primary key |
| `user_id`   | bigint    | not null, indexed     |
| `server_id` | bigint    | not null, indexed     |
- `belongs_to :server`
- `belongs_to :moderator`
- index on `[:server_id, :user_id], unique: true`
## friends
| column name  | data type | constraints           |
|--------------|-----------|-----------------------|
| `id`         | bigint    | not null, primary key |
| `friend_id`  | bigint    | not null, indexed     |
| `created_at` | datetime  | not null              |
- index on `[:id, :friend_id], unique: true`
- has_many `:direct_messages`
- belongs_to `:user`

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

# Frontend Routes
## Authentication Routes:
* /login
* /register
* /forgot-password
* /reset-password

## Main Application Routes:
* /dashboard
* /friends
* /profile
* /servers
* /servers/create
* /servers/:serverId
* /servers/:serverId/settings
* /servers/:serverId/channels/:channelId

## Server Management Routes:
* /servers/:serverId/members
* /servers/:serverId/members/:memberId
* /servers/:serverId/channels/create

## Direct Messaging Routes:
* /direct-messages
* /direct-messages/:friendId

## Message Detail Routes:
* /servers/:serverId/channels/:channelId/messages/:messageId

## Search and Discovery Routes:
* /search

## Settings Routes:
* /settings
* /settings/profile
* /settings/account
* /settings/notifications
* /settings/appearance

## Miscellaneous Routes:
* /about
* /help
* /terms
* /privacy

# Backend Routes

## HTML
* ```GET /``` - ```StaticPagesController#FrontendIndex```

# API Endpoints
## ```users```
### User Routes:
* ```GET /api/users/:userId``` - return user information by ID ```#show```
* ```POST /api/users/:userId``` - user sign-up/creation ```#create```
* ```PATCH /api/users/:userId``` - update user profile information ```#update```
* ```DELETE /api/users/:userId``` - delete user account ```#destroy```

## ```session```
### Authentication Routes
* ```GET /api/session``` - returns CSRF token and current user to populate front-end store ```#show```
* ```POST /api/session``` - signs user in ```#create```
* ```DELETE /api/session``` - logs current user out ```#destroy```

## ```server```
### Server Routes:
* ```GET /api/servers``` - returns list of servers current user is part of ```#index```
* ```GET /api/servers/:serverId``` - returns details of specific server ```#show```
* ```POST /api/servers``` - create a new server ```#create```
* ```PATCH /api/servers/:serverId``` - update server details (if user is owner) ```#update```
* ```DELETE /api/servers/:serverId``` - delete server (if user is the owner) ```#destroy```
### Server Membership and Roles Routes:
* ```GET /api/servers/:serverId/members``` - returns list of members in a server ```#index```
* ```POST /api/servers/:serverId/members/:memberId/invite``` - invite a user to a server ```#create```
* ```POST /api/servers/:serverId/members/:memberId/join``` - join a server using an invite ```#update```
* ```PATCH /api/servers/:serverId/members/:memberId```- manage member roles and permissions (if have permission) ```#update```

## ```channels```
### Channel Routes:
* ```GET /api/channels/``` - returns index of channels ```#index```
* ```POST /api/channels``` - create a new channel (if user has permission) ```#create```
* ```PATCH /api/channels/:channelId``` update channel details (if user has permission) ```#update```
* ```DELETE /api/channels/:channelId``` delete a channel (if user has permission) ```#destroy```

## ```messages```
### Channel Message Routes:
* ```GET /api/channels/:channelId/messages``` - returns messages in a channel ```#index```
* ```POST /api/channels/:channelId/messages``` - create a new message in a channel ```#create```
* ```PATCH /api/channels/:channelId/messages/:messageId``` - edit a message in a channel ```#update```
* ```DELETE /api/channels/:channelId/messages/:messageId``` - delete a message in a channel (if user has permission) ```#destroy```
## ```direct_messages```
### Direct Message Routes:
* ```GET /api/friends/:friendId/messages``` - returns direct messages with a specific user ```#show```
* ```POST /api/friends/:friendId/messages``` - create new direct message ```#create```
* ```PATCH /api/friends/:friendId/messages/:messageId``` - edit a direct message ```#update```
* ```DELETE /api/friends/:friendId/messages/:messageId``` - delete a direct message ```#destroy```

## ```friends```
### Friendship Routes:
* ```GET /api/friends``` - return list of friends ```#index```
* ```POST /api/friends/:friendId``` - send a friend request ```#create```
* ```PATCH /api/friends/:friendId``` - accept or decline a friend request ```#update```
* ```DELETE /api/friends/:friendId``` - remove a friend ```#destroy```
