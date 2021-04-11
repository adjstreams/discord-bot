# discord-bot
This won't be much use to people, the use case was to enable Twitch Subs and people with the VIP discord role to be automatically announced when they start streaming.  This got around a limitation with YAGPDB, which only allows all users or one specific role to have automatic announcements enabled.

I got around this by creating an "Announce if Streaming" role in discord which is what YAGPDB looks for, and created this bot to maintain the role by listening out for changes to discord users.  Whenever their discord role becomes Subscriber or VIP, or is removed, it updates the "Announce If streaming" role accordingly.

This was a quick hack. If I turn this into a user discord bot It'll need refactoring and software engineering best practices applied.

