var fs = require("fs");
var exec = require("child_process").exec;
var spawn = require("child_process").spawn;

if (process.argv[2] == "--version") {
        console.log("JSXHint v0.8.3 (2.5) (Impersonating -- This is a drop-in replacement for JSXHint by Jonathan Warner, not the real deal.");
        process.exit();
}

exec("jsx " + process.argv[3], function(err, stdout, stderr) {
        if (stderr.split("\n").length > 2) {
                var file = stderr.match(/Error while reading module (.*):/);
                if (file)
                        file = file[1];
                file = "reacterest/js/components/Pin.js";
                var regex = /Error: (.*)/g;
                var count = 0;
                while ((results = regex.exec(stderr)) !== null) {
                        var line = results[1].match(/Line (\d+)/);
                        if (line)
                                line = line[1];
                        console.log(process.argv[3] + ": line " + line + ", col 1, " + results[1] + ". (E030)");
                        count++;
                }
                console.log("\n" + count + " errors");
        } else {
                var data = "";
                var jshint = spawn("jshint", ["/dev/stdin", "--verbose", "--filename", "butts"]);
                jshint.stdin.setEncoding = 'utf-8';
                jshint.stdout.on("data", function(chunk) {
                        data += chunk;
                });
                jshint.stdout.on("end", function() {
                        data = data.replace(/\/dev\/stdin/g, process.argv[3]);
                        console.log(data);
                });
                jshint.stdin.write(stdout);
                jshint.stdin.end();
        }
});

