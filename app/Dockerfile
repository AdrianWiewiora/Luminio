FROM denoland/deno:latest
EXPOSE 8000
WORKDIR /app
COPY . .
RUN deno cache server.ts
CMD ["deno", "run", "--allow-net", "--allow-env", "server.ts"]
