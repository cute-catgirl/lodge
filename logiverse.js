export default {
    name: 'maemoon.me',
    description: 'A webview for the Logiverse',
    frontend: 'https://login.maemoon.me',
    repository: 'https://github.com/tristie/www/tree/main/logarithm',

    endpoints: {}
}

export const config = {
    version: '0.0.1',

    // I just made these gifs global since most instances use them anyways
    gifs: {
        berd: {
            src: 'https://www.todepond.com/image/berd.gif',
            alt: 'A sparkly bird gif'
        },
        bot: {
            src: 'https://www.todepond.com/image/bot.gif',
            alt: 'A sparkly robot gif'
        },
        tode: {
            src: 'https://www.todepond.com/image/tode.gif',
            alt: 'A sparkly toad gif'
        }
    },
    instances: [
        {
            name: 'todepond.com',
            admin: 'TodePond',

            frontend: 'https://todepond.com/lab/login',
            repository: 'https://github.com/TodePond/TodePondDotCom/tree/main/lab/login',

            endpoints: {
                feed: 'https://todepond-lablogingetusers.web.val.run',
                update: 'https://todepond-labloginupdatestatus.web.val.run',
                login: 'https://todepond-lablogin.web.val.run',
                delete: 'https://todepond-lablogindeleteaccount.web.val.run',
                ban: 'https://todepond-labloginbanuser.web.val.run',
            }
        },
        {
            name: 'svenlaa.com',
            admin: 'Svenlaa',

            frontend: 'https://svenlaa.com/playground/loggo',
            repository: 'https://github.com/Svenlaa/svenlaa.com/tree/main/playground/loggo',

            endpoints: {
                feed: 'https://api.svenlaa.com/logiverse/logs',
                update: 'https://svenlaa-labloginupdatestatus.web.val.run',
                login: 'https://svenlaa-lablogin.web.val.run',
                delete: 'https://svenlaa-lablogindeleteaccount.web.val.run',
                ban: 'https://svenlaa-labloginbanuser.web.val.run'
            }
        },
        {
            name: 'evolved.systems',
            admin: 'evol',

            frontend: 'https://evolved.systems/logon',

            endpoints: {
                feed: 'https://evol-lablogingetusers.web.val.run',
                update: 'https://evol-labloginupdatestatus.web.val.run',
                login: 'https://evol-lablogin.web.val.run',
                delete: 'https://evol-labloginbanuser.web.val.run',
                ban: 'https://evol-labloginbanuser.web.val.run'
            }

        },
        {
            name: 'rossilaz.xyz',
            admin: 'Rosy',

            frontend: 'https://login.rossilaz.xyz',
            repository: 'https://github.com/RosyArts/login-redux',

            endpoints: {
                feed: 'https://mittzy-lablogingetusers.web.val.run',
                update: 'https://mittzy-loginredux_updatestatus.web.val.run',
                login: 'https://mittzy-loginredux_login.web.val.run',
                delete: 'https://mittzy-loginredux_deleteaccount.web.val.run',
                ban: 'https://mittzy-loginredux_banuser.web.val.run',
            }
        },
        {
            name: 'maemoon.me',
            admin: 'Mae',

            frontend: 'https://cute-catgirl.github.io/login/',
            repository: 'https://github.com/cute-catgirl/login',

            endpoints: {
                feed: 'https://maemoon-lablogingetusers.web.val.run',
                update: 'https://maemoon-labloginupdatestatus.web.val.run',
                login: 'https://maemoon-lablogin.web.val.run',
                delete: 'https://maemoon-lablogindeleteaccount.web.val.run',
                ban: 'https://maemoon-labloginbanuser.web.val.run'
            }
        }
    ]
}