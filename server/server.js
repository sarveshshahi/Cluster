import express from 'express';
import cluster from 'cluster';
import os from 'os';

const totalcpus = os.cpus().length;
console.log(totalcpus);

if (cluster.isPrimary) { // or cluster.isMaster for Node.js < v16.0.0
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < totalcpus; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const port = 8000;
    app.get("/", (req, res) => {
        return res.json({
            message: `Hello from express server ${process.pid}`
        });
    });
    app.get("/a", (req, res) => {
        return res.json({
            message: `Hello from express server ${process.pid}`
        });
    });
    app.listen(port, () => console.log(`server started at ${port}`));
}
