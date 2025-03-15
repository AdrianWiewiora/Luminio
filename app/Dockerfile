FROM denoland/deno:latest
WORKDIR /app
COPY deno.json deno.lock vite.config.ts /app/
COPY src /app/src
COPY public /app/public
COPY index.html /app/
RUN deno install
EXPOSE 5173
CMD ["deno", "task", "dev"]
