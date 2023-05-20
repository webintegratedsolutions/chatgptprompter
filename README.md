# Chatbot UI

Chatbot UI is an open source chat UI for AI models.

<a href="https://discord.gg/q9AQP2w6gK">
  <img src="https://discordapp.com/api/guilds/1103099861215232010/widget.png?style=banner2" alt="Discord Banner"/>
</a>

![Chatbot UI](./public/screenshots/main_screenshot.png)

See a [demo](https://twitter.com/mckaywrigley/status/1640380021423603713?s=46&t=AowqkodyK6B4JccSOxSPew).

## Updates

**Work Completed:**

- [x] Relational database support
- [x] Multiple accounts support
- [x] SSO Authentication support
- [x] Customizable build-time extensions system
- [x] [@chatbot-ui/core](https://github.com/jorge-menjivar/chatbot-ui-core)
- [x] [@chatbot-ui/local-storage](https://github.com/jorge-menjivar/chatbot-ui-local-storage) extension
- [x] [@chatbot-ui/rdbms](https://github.com/jorge-menjivar/chatbot-ui-rdbms) extension
- [x] [@chatbot-ui/supabase](https://github.com/jorge-menjivar/chatbot-ui-supabase) extension

**Up Next:**

- [ ] In-app plugin system
- [ ] @chatbot-ui/couchdb extension
- [ ] @chatbot-ui/mongodb extension

## Deploy

**Vercel**

Host your own live version of Chatbot UI with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjorge-menjivar%2Fchatbot-ui)

## Usage

### Step 1. Clone Repo

```sh
git clone https://github.com/jorge-menjivar/chatbot-ui.git
```

### Step 2. Install Dependencies

```sh
npm i
```

### Step 3. Add extensions

Enable extensions by following the instructions in the README files of the extensions you want to use:

- [@chatbot-ui/local-storage](https://github.com/jorge-menjivar/chatbot-ui-local-storage) [pre-installed]
- [@chatbot-ui/rdbms](https://github.com/jorge-menjivar/chatbot-ui-rdbms)
- [@chatbot-ui/supabase](https://github.com/jorge-menjivar/chatbot-ui-supabase)
- @chatbot-ui/couchdb [coming soon]
- @chatbot-ui/mongodb [coming soon]

### Step 4. Run App

Run Locally:

```sh
npm run dev
```

Or run with Docker:

```sh
docker build -t chatbot-ui . --rm
docker run --env-file=.env.local -p 3000:3000 --name chatbot chatbot-ui
```

### (Optional) Step 5. Provide OpenAI API Key

To give everyone using the chatbot access to an API key, create a `.env.local` file and set:

```sh
OPENAI_API_KEY=YOUR_KEY
```

Notes:

- If you do not provide an OpenAI API key, users will have to provide their own key.
- If you don't have an OpenAI API key, you can get one [here](https://platform.openai.com/account/api-keys).
- You can set `OPENAI_API_HOST` where access to the official OpenAI host is restricted or unavailable, allowing users to configure an alternative host for their specific needs.
- Additionally, if you have multiple OpenAI Organizations, you can set `OPENAI_ORGANIZATION` to specify one.

## Configuration

When deploying the application, the following environment variables can be set:

### Chat-related Variables

| Environment Variable              | Default value                                       | Description                                                       |
| --------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| OPENAI_API_KEY                    |                                                     | The default API key used for authentication with OpenAI           |
| OPENAI_API_HOST                   | `https://api.openai.com`                            | The base url, for Azure use `https://<endpoint>.openai.azure.com` |
| OPENAI_API_TYPE                   | `openai`                                            | The API type, options are `openai` or `azure`                     |
| OPENAI_API_VERSION                | `2023-03-15-preview`                                | Only applicable for Azure OpenAI                                  |
| OPENAI_ORGANIZATION               |                                                     | Your OpenAI organization ID                                       |
| DEFAULT_MODEL                     | `gpt-3.5-turbo` _(OpenAI)_ `gpt-35-turbo` _(Azure)_ | The default model to use on new conversations                     |
| NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT | [see here](./utils/app/const.ts)                    | The default system prompt to use on new conversations             |
| NEXT_PUBLIC_DEFAULT_TEMPERATURE   | 1                                                   | The default temperature to use on new conversations               |
| GOOGLE_API_KEY                    |                                                     | See [Custom Search JSON API documentation][GCSE]                  |
| GOOGLE_CSE_ID                     |                                                     | See [Custom Search JSON API documentation][GCSE]                  |

### Authentication Variables

| Environment Variable        | Default value           | Description                                                                                                              |
| --------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| NEXT_PUBLIC_AUTH_ENABLED    | `false`                 | Enable SSO authentication. set 'true' or 'false'                                                                         |
| NEXTAUTH_EMAIL_PATTERN      |                         | The email regex pattern granted access to chatbot-ui. For example `.+@mydomain.com`                                      |
| NEXTAUTH_SECRET             |                         | NextAuth Settings. See [Documentation](https://next-auth.js.org/configuration/options#nextauth_secret)                   |
| NEXTAUTH_URL                | `http://localhost:3000` | NextAuth Settings. See [Documentation](https://next-auth.js.org/configuration/options#nextauth_url)                      |
| NEXTAUTH_URL_INTERNAL       |                         | (Optional) NextAuth Settings. See [Documentation](https://next-auth.js.org/configuration/options#nextauth_url_internal). |
| \<PROVIDER\>\_CLIENT_ID     |                         | Provider OAuth Client ID                                                                                                 |
| \<PROVIDER\>\_CLIENT_SECRET |                         | Provider OAuth Client Secret                                                                                             |
| \<PROVIDER\>\_ISSUER        |                         | Provider Issuer URL                                                                                                      |

Where \<PROVIDER\> is one of the following:

- APPLE
- AUTH0
- COGNITO
- DISCORD
- FACEBOOK
- GITHUB
- GITLAB
- GOOGLE
- OKTA
- REDDIT
- SALESFORCE
- SLACK
- SPOTIFY
- TWITCH
- TWITTER

For example, to enable Google and Github authentication, you would add the following to your `.env.local` file:

```sh
GITHUB_CLIENT_ID=xxxxxxxxxxxxx
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxx
GOOGLE_CLIENT_ID=xxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxx
```
