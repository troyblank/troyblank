module.exports = {
    deploy: {
        command: '<%= ssh.commands %>',
        options: {
            host: '<%= ssh.host %>',
            port: '<%= ssh.port %>',
            username: '<%= ssh.username %>',
            privateKey: '<%= privateKey %>'
        }
    }
};
