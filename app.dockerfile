FROM denoland/deno:latest
WORKDIR /LuminioApp/app
COPY common/ ../common/
COPY app/deno.json .
COPY app/deno.lock .
COPY app/vite.config.ts .
COPY app/src ./src
COPY app/public ./public
COPY app/index.html .
RUN deno install
EXPOSE 5173
CMD ["deno", "task", "dev"]
