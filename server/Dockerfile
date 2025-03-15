FROM denoland/deno:latest
WORKDIR /server
COPY . . 
RUN deno cache src/main.ts
EXPOSE 8000
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--allow-ffi", "--allow-write", "src/main.ts"]
