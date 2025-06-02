module.exports = {
  apps: [
    {
      name: "backend-1",
      script: "dist/app.js",
      env: {
        PORT: 3001,
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      }
    },
    {
      name: "backend-2",
      script: "dist/app.js",
      env: {
        PORT: 3002,
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      }
    },
    {
      name: "backend-3",
      script: "dist/app.js",
      env: {
        PORT: 3003,
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      }
    }
  ]
}
