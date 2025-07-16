const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
    if (phase == PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                MONGO_URI: `mongodb+srv://root:manager@cluster0.2cokqwg.mongodb.net/blog-app-dev`
            }
        };
    }

    return {
        env: {
            MONGO_URI: `mongodb+srv://root:manager@cluster0.2cokqwg.mongodb.net/blogs-app`
        }
    };
};