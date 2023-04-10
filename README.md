> **Note**: This repo is for APLHA MU assessment. This repo is no longer officially maintained as of April, 2023.
> Feel free to use it, fork it and patch it for your own needs.

## The node.js ALPHA MU assessment

The node.js ALPHA MU assessment contains two endpoints:

- Convert number to words
- Convert words to number

## Requirements

- Node 17.7.1
- Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/Faizan20/Aplha_MU.git
cd Aplha_MU
```

```bash
npm install
```

To start the express server, run the following

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

## Use Docker

You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/Faizan20/Aplha_MU.git
```

Step 2: Build the Docker image

```bash
docker build -t aplha_mu.nodejs .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d aplha_mu.nodejs
```
