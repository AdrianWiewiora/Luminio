FROM denoland/deno:latest
WORKDIR /LuminioServ/server
COPY common/ ../common/
COPY migrations/ ../migrations/
COPY photos/ ../photos/
COPY server/src/ src/
COPY server/deno.json .
COPY server/deno.lock .
COPY server/deps.ts .
COPY server/config.docker.ts config.ts
RUN deno cache src/main.ts
EXPOSE 8000
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--allow-ffi", "--allow-write", "src/main.ts"]