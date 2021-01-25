const Discord = require('discord.js')
const config = require('./config.json')
const ping = require('./ping.js')
console.clear()
console.log('\x1Bc')
const client = new Discord.Client()

client.login(config.BOT_TOKEN).catch(console.error)

const prefix = '!'

client.on('message', function (message) {
    if (message.author.bot) {
        return
    }
    if (!message.content.startsWith(prefix)) {
        return
    }

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()

    if (command === 'ping') {
        ping(message)
    }
})

client.on('guildMemberUpdate', function (oldMember, newMember) {
    if (IsUpdatingAnnounceIfStreamingRole(oldMember, newMember)) {
        return;
    }

    let announceIfStreamingRole = newMember.guild.roles.cache.find(
        (r) => r.name === config.ANNOUNCE_IF_STREAMING_ROLE
    )

    let modChannel = client.channels.cache.get(config.CHANNEL_ID)

    if (newMember.roles.cache.find((role) => isPrivileged(role))) {
        modChannel.send('We love ' + newMember.user.username + ' now!')
        newMember.roles.add(announceIfStreamingRole).catch(console.error)
    } else {
        modChannel.send(
            "We don't love " + newMember.user.username + ' anymore.'
        )
        newMember.roles.remove(announceIfStreamingRole).catch(console.error)
    }
})

function IsUpdatingAnnounceIfStreamingRole(oldMember, newMember) {
    let isUpdateStreamingRole = false;

    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        // Looping through the role and checking which role was removed.
        oldMember.roles.cache.forEach((role) => {
            if (!newMember.roles.cache.has(role.id)) {
                if (role.name == config.ANNOUNCE_IF_STREAMING_ROLE) {
                    isUpdateStreamingRole = true;
                }
            }
        })
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        // Looping through the role and checking which role was added.
        newMember.roles.cache.forEach((role) => {
            if (!oldMember.roles.cache.has(role.id)) {
                if (role.name == config.ANNOUNCE_IF_STREAMING_ROLE) {
                    isUpdateStreamingRole = true;
                }
            }
        })
    }

    return isUpdateStreamingRole;
}

function isPrivileged(role) {
    // At some point put this in a config setting
    return role.name === 'Twitch Subscriber' || role.name === 'VIP';
}
