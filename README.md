# Some initial setup Node.js project

- [Typescript](#typescript)
- [Eslint, Prettier](#eslint-prettier)
- [Authentication](#authentication)
- [Cors](#cors)
- [Site](#site)
- [Credential](#credential)
- [Debug](#debug)

## Typescript

Although config typescript like es module (import/export),
indeed it's still commonjs
=> some lib don't support commonjs need dynamic import

Can't use default config of ts by extends config base https://github.com/tsconfig/bases/

**Install**

- typescript (tsc - file tsconfig.ts to config compile/build)
- tsx (to run) or ts-node, but tsx is more comprehensive
- nodemon to auto reload or use tsx with --watch
- rimraf delete build folder before build

## Eslint, Prettier

- Install:

  - @eslint/config@latest: install needed package and setup default config

  - "prettier"
  - "eslint-config-prettier": to avoid conflict
  - "eslint-plugin-prettier": check error eslint with prettier
    => set rule prettier (.prettier) and rule in eslint.config.mjs equivalent

## Authentication

**Some type:**

- Basic - (no recommend)
- Cookie
- Session (in server): slow because query data
- JWT (stateless - just store in client): fast because don't need to query data => can combine with Session to make stateful, include
  - Access token (stateless - in browser)
  - Refresh token (stateful - in server (file, cache, ram, db))
- Open (OAuth 2.0)

**Note:**

- There no perfect method, any of them have props and cons
- Depend on how much secure application need, we'll define the suitable strategy

## Cors

**Ref:**

- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy
- https://stackoverflow.com/questions/48077289/does-express-disable-cors-by-default
- https://stackoverflow.com/questions/42965375/restricting-cors-origin-with-node-express-not-working
- https://stackoverflow.com/questions/56965476/cors-cookie-not-set-on-cross-domains-using-fetch-set-credentials-include-an

**Access control scenarios**

- **Simple requests**: Some requests don't trigger a CORS preflight. Those are called simple requests.  
  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests
- **Preflighted requests**: Unlike simple requests, for "preflighted" requests the browser first sends an HTTP request using the OPTIONS method to the resource on the other origin, in order to determine if the actual request is safe to send. Such cross-origin requests are preflighted since they may have implications for user data.
  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests
- **Requests with credentials**: The most interesting capability exposed by both fetch() or XMLHttpRequest and CORS is the ability to make "credentialed" requests that are aware of HTTP cookies and HTTP Authentication information. By default, in cross-origin fetch() or XMLHttpRequest calls, browsers will not send credentials (-- To ask for a fetch() request to include credentials, set the credentials option to "include". --- To ask for an XMLHttpRequest request to include credentials, set the XMLHttpRequest.withCredentials property to true.)
  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials

**What is cors**

- Cors like a policy of response header.

- We use cors to set header that give browser info to handle.
  => if browser set mode='no-cors' => can't protect response from js script

- Cors can't protect server so

- Cors lib of express don't handle prevent request, it just set value to header of response (Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Access-Control-Max-Age, Access-Control-Expose-Headers)

- Browser (Fetch API or XMLHttpRequest) will handle cors, if header don't have origin which is where sent the request (in cors request) => if have the browser will allow js code access request and vice versa.

## Site

**Compare with origin**

- Site is different with origin
- Origin different went 1 of 3 factors not same: schema (http/https/ws...), domain (localhost, 120.0.0.1), port (:3001, :8000)
- Site is more complicated
- Site diff => origin diff but not vice versa

**sameSite**

- sameSite is property when setting cookie
- have 3 value: strict, lax, none
  - Strict: Ensures that the cookie is only sent in requests within the same site
  - None: Removes restrictions on cookies being sent, allowing the cookie data to be shared with third parties
  - Lax: is a setting for HTTP cookies that allows most cross-domain cookie-sharing, but only under certain conditions
    - The request is a top-level GET request
    - The request is the result of a user navigating to the origin site from an external site

## Credential

The credentials read-only property of the Request interface reflects the value given to the Request() constructor in the credentials option. It determines whether or not the browser sends credentials with the request, as well as whether any Set-Cookie response headers are respected.

Credentials are cookies, TLS client certificates, or authentication headers containing a username and password.

**Value**

- omit: Never send credentials in the request or include credentials in the response.

- same-origin: Only send and include credentials for same-origin requests.

- include: Always include credentials, even for cross-origin requests.

## Typescript

- Debug with "Launch via NPM", "nodemon" need to turn off all breakpoint
- Debug with "--inspect" and "Attach to process" don't need to turn of breakpoint ===> prefer
  ==> All need to re-attach after restart
