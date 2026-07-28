# Slack OAuth Setup Guide

## Your Slack Bot Token
```
your_slack_bot_token_here
```

## Step 1: Create Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click "Create New App" → "From scratch"
3. Enter app name: "GmLeads" (or your preferred name)
4. Select your workspace: "Mkdir Gpt"

## Step 2: Configure OAuth & Permissions

1. In your app settings, go to **OAuth & Permissions** (left sidebar)
2. Under **Bot Token Scopes**, add these scopes:
   - `channels:join` - Join public channels
   - `channels:read` - View basic information about public channels
   - `chat:write` - Send messages as GmLeads Bot
   - `chat:write.public` - Send messages to channels GmLeads Bot isn't a member of

3. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/api/slack/callback
   ```
   
   Or for production:
   ```
   https://your-domain.com/api/slack/callback
   ```

4. Click **Save URLs**

## Step 3: Install App to Workspace

1. Click **Install to Workspace** (top of page)
2. Authorize the app
3. Copy the **Bot User OAuth Token** (starts with `xoxb-`)
   - You already have this: `your_slack_bot_token_here`

## Step 4: Get Client ID & Secret

1. In **Basic Information** → **App Credentials**:
   - Copy **Client ID**
   - Copy **Client Secret**

## Step 5: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Slack OAuth Configuration
SLACK_BOT_TOKEN=your_slack_bot_token_here
SLACK_CLIENT_ID=your_client_id_here
SLACK_CLIENT_SECRET=your_client_secret_here
SLACK_SIGNING_SECRET=your_signing_secret_here
NEXT_PUBLIC_SLACK_CLIENT_ID=your_client_id_here
```

## Step 6: Enable Socket Mode (Optional but Recommended)

For real-time messaging without a public server:

1. Go to **Socket Mode** in your app settings
2. Enable Socket Mode
3. Generate an **App-Level Token** with scope: `connections:write`
4. Add to `.env.local`:
   ```env
   SLACK_APP_TOKEN=xapp-1-...
   ```

## Step 7: Test the Integration

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click the **"Contact GmLeads Team"** button (bottom right)
4. Click **"Connect Slack"**
5. Authorize the app in Slack
6. You should be redirected back with success message

## How It Works

### Contact Widget Flow:
```
User clicks "Contact GmLeads Team" 
  → Widget opens
  → User clicks "Connect Slack"
  → Redirects to Slack OAuth
  → User authorizes app
  → Redirects back to /?slack_connected=true
  → Shows success message
```

### Lead Notification Flow (when widget is installed on customer site):
```
Visitor interacts with GmLeads widget on customer's website
  → GmLeads backend identifies visitor
  → Backend sends Slack message using bot token
  → Message appears in customer's Slack channel
```

## Slack Message Format

When a lead is captured, the bot sends a message like:

```json
{
  "channel": "#sales-leads",
  "text": "New lead captured!",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*🏢 Acme Corp*\n• Industry: Enterprise SaaS\n• ICP Score: 92\n• Page: /pricing\n• [View in Dashboard](https://dashboard.gmleads.com/leads/123)"
      }
    }
  ]
}
```

## Troubleshooting

### "Invalid redirect URL" error
- Make sure the redirect URL in Slack app settings exactly matches: `http://localhost:3000/api/slack/callback`
- No trailing slash
- Must use HTTP (not HTTPS) for localhost

### "Bot not in channel" error
- Use `chat:write.public` scope to post to any channel
- Or invite the bot to the channel: `/invite @GmLeads`

### Token not working
- Verify the token starts with `xoxb-`
- Check that the bot is installed to your workspace
- Ensure token hasn't been revoked

## Production Deployment

When deploying to production:

1. Update redirect URLs in Slack app settings to your production domain
2. Use environment variables for all tokens (never commit to git)
3. Consider using a database to store workspace tokens securely
4. Implement token refresh logic (Slack tokens expire)
5. Add error handling for expired/invalid tokens