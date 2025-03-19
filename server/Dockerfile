FROM denoland/deno:latest
WORKDIR /server
COPY src/ src/
COPY deno.json .
COPY deno.lock .
COPY deps.ts .
COPY config.docker.ts config.ts
RUN deno cache src/main.ts
EXPOSE 8000
CMD ["deno", "run", "--watch", "--allow-net", "--allow-env", "--allow-read", "--allow-ffi", "--allow-write", "src/main.ts"]