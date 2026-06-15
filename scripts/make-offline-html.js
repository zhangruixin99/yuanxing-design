const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.join(distDir, "index.html");

let html = fs.readFileSync(indexPath, "utf8");
let inlineScript = "";

html = html.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/,
  (_match, href) => {
    const cssPath = path.join(distDir, href.replace(/^\.\//, ""));
    const css = fs.readFileSync(cssPath, "utf8");
    return `<style>\n${css}\n</style>`;
  }
);

html = html.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
  (_match, src) => {
    const jsPath = path.join(distDir, src.replace(/^\.\//, ""));
    const js = fs.readFileSync(jsPath, "utf8");
    inlineScript = `<script>\n${js}\n</script>`;
    return "";
  }
);

html = html.replace("</body>", `${inlineScript}\n  </body>`);

fs.writeFileSync(indexPath, html, "utf8");
