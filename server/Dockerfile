FROM denoland/deno:latest
EXPOSE 8000
WORKDIR /app
COPY . .
RUN deno cache server.ts
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read ", "--allow-ffi " , "server.ts"]