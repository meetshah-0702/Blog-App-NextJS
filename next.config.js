const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
    if (phase == PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                MONGO_URI: `mongodb+srv://meetushah999:manager@cluster0.0zelf.mongodb.net/blog-app-dev`
            }
        };
    }

    return {
        env: {
            MONGO_URI: `mongodb+srv://meetushah999:manager@cluster0.0zelf.mongodb.net/blog-app`
        }
    };
};