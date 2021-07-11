# HELLO DEAR VISITOR!!

![](./images/Under-Construction-Anime.jpg)

## This project is actively being build and will soon be deployed for users to shop and enjoy. You can still go through project files and documentation down below.

## Sincere apologies for the inconvenience and Thank You for Visiting

# E-Commerce Amazon Clone with Microservices

## Table of Contents

1. [Introduction](#introduction)
1. [Motivation](#motivation)
1. [Pre-requisites](#pre-requisites)
1. [Implementation Instructions (TLDR)](#implementation-instructions-TLDR)
1. [Design Decisions and Strucutre](#design-decisions-and-strucutre)
1. [Known Implementation Issues and Solutions](#known-implementation-issues-and-solutions)
1. [Technologies Used](#technologies-used)

NOTE: New instructions will be added below as the project progresses

## Introduction

Creating an easy to use E-commerce online store where users can buy and sell the goods. The application is based on microservices architecture build using MERN stack, scaled using Kubernetes, and deployed using Google Cloud.

Some of the highlighted technologies in this project include

- Authentication/Authorization(JWT with Cookies)
- Error Handling for services and middlewares with TypeScript
- Automated Unit and Integral Testing and Test Suite
- Multi-pod Kubernetes setup in Google Kubernetes Engine(GKE)
- NextJS for Server-Side Rendering(SSR) application
- NATS Event Bus for service isolation
- Secure Payment service with Stripe API

## Motivation

I always wanted to know how these giant online websites like Amazon that sell goods were created. Handling real goods and money is a real feat. On the other hand, it always bothered me to hear "scalable", "serverless", "cloud", "production-ready", etc. words and how they are NOT something anyone can create.

Thus, to learn the REAL tech and prove others wrong, I was motivated enough to create something that included everything.

This is a MEGAPROJECT of building a scalable, production-grade Amazon-like E-commerce website using pure Microservices architecture and Google Kubernetes Engine.

## Pre-requisites

This project's implementation and debugging might come as very confusing and challenging unless you meet the following pre-requisites

### Knowledge pre-requisites

- Understanding of basic microservices architecture
- Understanding of Docker and Kubernetes (fundamentals videos from Youtube should be enough)
- Very basic understanding of Google cloud (most instructions in [Implementation](#implementation-instructions-TLDR) section below)
- Familiar with MERN stack

### System pre-requisites

- NPM
- MongoDB
- Docker Desktop or similar container runtime software with Kubernetes support
- Google Cloud account (I have attached necessary instructions inside [Implementation](#implementation-instructions-TLDR) section below)

NOTE: Don't panic!! I was not familiar with some of the tech listed above too. But you can learn ANYTHING :)

## Implementation Instructions (TLDR)

- Created a free google cloud account and a new project named "ticketing.dev".
- Click on the top left side options slider and go to the "Kubernetes Engine" tab. We will be using this in the future to refer to our cluster information.
- Click on "create cluster" and "Create" a cluster.
- Install google SDK on our local machine.
- Initialize gcloud in the root directory by running the command

  ```
  gcloud init
  ```

- Once the setup is done, we have to make sure we will run our kubectl commands to connect to Google Cloud Cluster. To do that, go back to the Kubernetes Engine page. Click on the Clusters tab.
- You will see your project's cluster running. Click on the "connect" button on its side and run that command on your local terminal. This will create a link to our cluster that we can connect from our terminal.
- To change run our kubectl commands inside the cluster, right-click on your running "Docker Desktop" application logo on your OS. Click on the "Kubernetes" drop-down option and select the name with "gke...". That is your cluster. Now your kubectl will directly run commands inside your cluster.
- On your Google project page. Click on the top left side options slider and click on "Cloud Build". Enable that API.
- To install Load Balancer and Ingress controller on our cluster, go to the "https://kubernetes.github.io/ingress-nginx/deploy" and run the setup command for GCE-GKE in the terminal.
- To create a direct URL link from our browser to our Google Cloud application, click on the top left side options slider and click on "Load balancer" from the "Networking Services" option. You will see our load balancer listed. Open it and copy the IP shown on the page (ignore port).
- Change the "/c/Windows/System32/drivers/etc/hosts" file on Windows or "/etc/hosts" if on Linux/Mac and put the following line in it.
  ```
  copied_ip ticketing.dev
  ```
- We have to create a K8s Secret object that will hold our JWT secret. This service will be used by other pods to decode user's JWT tokens.
  ```
  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_key
  ```
  NOTE: New instructions will be added below as the project progresses

## Design Decisions and Structure

- This project follows microservices architecture along with database per service structure.
- Created auth (authentication) server using express.
- Build Docker and GKE Kubernetes setup and unit tested.
- Created interfaces, middlewares, and custom errors for code consistency and to avoid duplicate codebases.

## Known Implementation Issues and Solutions

- If hot reload/ live update on skaffold with GKE is not working, go to package.json file and modify start script as follows,
  ```
  "scripts": { "start": "ts-node-dev --poll src/index.ts" }
  ```
- If you get an error like "default credentials not found" or something with credentials, run the following command and login into your project's account
  ```
  gcloud auth application-default login
  ```
- While testing your application, if you are not able to access the API endpoint or getting 404 errors, change the protocol from "ticketing.dev/..." to "https://ticketing.dev/...". Explicitly mention HTTPS.
- EOF exiting with status code 1 or any disconnects while working with GKE. This cause due to VPN. Do not use VPN while working on this.
- If the testing environment shows some tests failing even after you resolved them, stop and restart that test by "Ctrl + C" and `npm test`.

## Technologies Used

### Application specific

- NodeJS
- ExpressJS Routers, Validator, Errors
- TypeScript
- Next (Server Side Rendering)
- Jest and Supertest (Unit and Integral testing)
- Stripe API (Payments)

### Cloud and Kubernetes

- Docker
- Skaffold
- Google Kubernetes Engine (GKE)
