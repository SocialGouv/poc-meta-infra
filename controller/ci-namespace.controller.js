const http = require("http");

const PORT = 8000;

http
  .createServer(async (req, res) => {
    console.log(`---> GOT ${req.method} ${req.url}`);

    let buffer = "";
    req
      .on("data", function (chunk) {
        buffer += chunk;
      })
      .on("end", function () {
        let params;
        try {
          params = JSON.parse(buffer);
        } catch (ex) {
          res.writeHead(400);
          return res.end("Bad JSON");
        }

        res.writeHead(200, { "Content-Type": "application/json" });

        console.log("params:", params);

        res.end(
          JSON.stringify({
            status: {namespaces: Object.keys(params.children['Namespace.v1']).length},
            children: [
              {
                apiVersion: "v1",
                kind: "Namespace",
                metadata: {
                  name: params.parent.metadata.name,
                },
              },
            ],
          })
        );
      });
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
