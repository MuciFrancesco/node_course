const missingSetting = "no value set for this env variable";

const config = {
    PORT: process.env.PORT || missingSetting,
    SESSION_SECRET: process.env.SESSION_SECRET || missingSetting,
};

export default config;
