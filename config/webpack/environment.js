const { environment } = require("@rails/webpacker");
const globCssImporter = require("node-sass-glob-importer");

// allows for sass globbing import /base/*
environment.loaders
  .get("sass")
  .use.find((item) => item.loader === "sass-loader").options.sassOptions = {
  importer: globCssImporter(),
};

module.exports = environment;