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
| column name  | data type | constraints               |
|--------------|-----------|---------------------------|
| `id`         | bigint    | not null, primary key     |
| `username`   | string    | not null, unique, indexed |
| `email`      | string    | not null, unique, indexed |
| `password`   | string    | not null                  |
| `avatar_url` | string    |                           |
| `created_at` | datetime  | not null, default NOW()   |

## servers
| column name  | data type | constraints                |
|--------------|-----------|----------------------------|
| `id`         | bigint    | not null, primary key      |
| `name`       | string    | not null                   |
| `owner_id`   | bigint    | not null, indexed          |
| `icon_url`   | string    |                            |
| `created_at` | datetime  | not null, default NOW()    |

## user_server
| column name | data type | constraints           |
|-------------|-----------|-----------------------|
| `id`        | bigint    | not null, primary key |
| `user_id`   | bigint    | not null, indexed     |
| `server_id` | bigint    | not null, indexed     |

## channels
| column name | data type | constraints             |
|-------------|-----------|-------------------------|
| `id`        | bigint    | not null, primary key   |
| `server_id` | bigint    | not null                |
| `name`      | string    | not null                |
| `type`      | string    | not null                |
| `created_at`| datetime  | not null, default NOW() |

## messages
| column name  | data type | constraints             |
|--------------|-----------|-------------------------|
| `id`         | bigint    | not null, primary key   |
| `user_id`    | bigint    | not null                |
| `channel_id` | bigint    | not null                |
| `content`    | text      | not null                |
| `created_at` | datetime  | not null, default NOW() |