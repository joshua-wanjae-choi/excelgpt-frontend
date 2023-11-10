FROM node:20-alpine

# Create User
RUN addgroup -S excelgpt && adduser -S excelgpt -G excelgpt
USER excelgpt

WORKDIR /home/excelgpt/app

COPY . .

RUN ls

RUN npm ci
RUN npm run build

# Command
CMD ["tail", "-f", ".gitignore"]
