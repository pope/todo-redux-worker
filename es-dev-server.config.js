/* eslint-disable @typescript-eslint/no-var-requires */
const bodyparser = require('koa-bodyparser');
const compress = require('koa-compress');

module.exports = {
    middlewares: [
        bodyparser(),
        compress(),
        async function replacer(context, next) {
            await next();
            if (!/redux/.test(context.request.url) || !context.response.body) {
                return;
            }
            const body = context.response.body.replace(
                /process\.env\.NODE_ENV/g,
                JSON.stringify('production')
            );
            context.body = body;
        },
    ],
    nodeResolve: true,
    open: false,
    port: 8080,
    watch: true,
};
