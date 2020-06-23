class Server {
  host = "localhost";
  port = 5001;
  scheme = "https";

  baseUrl() {
    return `${this.scheme}://${this.host}:${this.port}`;
  }
}

export const server = new Server();

export default Server;
