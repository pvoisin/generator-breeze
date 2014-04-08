var Path = require("path");
var Yeoman = require("yeoman-generator");
var Chalk = require("chalk");
var FileSystem = require("fs");


var BreezeGenerator = Yeoman.generators.Base.extend({
  init: function () {
    var self = this;

    self.pkg = require("../package.json");

    self.on("end", function () {
      if (!self.options["skip-install"]) {
        self.installDependencies();
      }
    });

    self._prepCopy = (function (legacy) {
      return function (source, destination, process) {
        var results = legacy.apply(self, arguments);
        results.destination = self._.template(results.destination, self, {interpolate: /%([\s\S]+?)%/g});
        return results;
      };
    })(self._prepCopy);
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.Yeoman);

    // replace it with a short and sweet description of your generator
    this.log(Chalk.magenta("You're using the fantastic Breeze generator."));

    var prompts = [
      {
        name: "projectName",
        message: "How would you like to name your project/application?"
      }
    ];

    this.prompt(prompts, function (properties) {
      this.projectName = properties.projectName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir("application");
    this.mkdir("application/views");
    this.mkdir("application/controllers");
    this.mkdir("application/configuration");
    this.mkdir("public");
    this.mkdir("public/assets");
    this.mkdir("public/assets/scripts");
    this.mkdir("public/assets/styles");
    this.mkdir("public/assets/images");
    this.mkdir("public/assets/fonts");
    this.mkdir("test");

    this.copy("_package.json", "package.json");
    this.copy("_bower.json", "bower.json");

    this.directory(".idea", ".idea");
  },

  projectfiles: function () {
    this.copy("editorconfig", ".editorconfig");
    this.copy("jshintrc", ".jshintrc");
  }
});

module.exports = BreezeGenerator;