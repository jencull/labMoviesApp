Claude-4-6-sonnet

## User (at PT-4-3)

How can I verify that my app is now connected with my backend? The backend api info is located in .env file and my app runs on localhost 3000

## Claude

The most direct way to verify the connection between your frontend and your Assignment 1 backend is to run a CORS preflight check — this is exactly what the browser does automatically before any real request is made. You run it manually using curl in the terminal.

The command tests whether the backend will accept requests from http://localhost:3000 (where your app is running):

```
curl -X OPTIONS https://1obeuo2r7b.execute-api.eu-west-1.amazonaws.com/prod/auth/signin \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -v 2>&1 | grep -i "access-control"
```
## User

Run that curl command please

## Claude

The response confirmed four things:

access-control-allow-origin: http://localhost:3000
access-control-allow-headers: Content-Type,Authorization
access-control-allow-methods: OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD
access-control-allow-credentials: true
These four headers together mean:

The backend recognises requests coming from localhost:3000 specifically
It will accept the Authorization header — which is how the JWT token gets sent with each request
It will accept POST, GET, PUT etc. — all the methods the app needs
allow-credentials: true means cookies and auth headers are permitted, not just plain requests
This is the PT-0 verification step from the spec. Without these headers being correct, every fetch call in app-api.ts would be blocked by the browser before it even reached the backend.