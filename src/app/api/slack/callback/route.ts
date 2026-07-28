// Slack OAuth callback endpoint
// This handles the OAuth flow when users install the GmLeads Slack app

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL("/?error=slack_auth_denied", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  // Exchange code for access token
  // In production, this would call Slack's API to get the access token
  // For now, we'll redirect back with a success message
  
  // Store the code temporarily (in production, exchange for token)
  // The actual token exchange should happen server-side
  
  return NextResponse.redirect(new URL("/?slack_connected=true", request.url));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Authorization code required" }, { status: 400 });
    }

    // Exchange authorization code for access token
    const slackClientId = process.env.SLACK_CLIENT_ID;
    const slackClientSecret = process.env.SLACK_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/slack/callback`;

    if (!slackClientId || !slackClientSecret) {
      return NextResponse.json({ error: "Slack credentials not configured" }, { status: 500 });
    }

    const tokenResponse = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: slackClientId,
        client_secret: slackClientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.ok) {
      console.error("Slack OAuth error:", tokenData.error);
      return NextResponse.json({ error: tokenData.error || "Failed to exchange code for token" }, { status: 400 });
    }

    // In production, store the access token securely (database, encrypted)
    // For now, return it to the client
    return NextResponse.json({
      success: true,
      accessToken: tokenData.access_token,
      team: tokenData.team,
      bot: tokenData.bot,
    });
  } catch (error) {
    console.error("Slack callback error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}