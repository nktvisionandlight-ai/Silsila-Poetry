# Silsila iOS Wrapper

This repository contains the Capacitor iOS wrapper and App Store preparation assets for Silsila.

Live app URL:

```text
https://silsila-poetry.replit.app/
```

Capacitor configuration:

- App ID: `com.silsila.app`
- App name: `Silsila`
- Web directory: `www`
- Runtime server URL: `https://silsila-poetry.replit.app/`

## Setup

```bash
npm install
npm run assets
npm run sync:ios
```

## Open in Xcode

```bash
npm run open:ios
```

Then set your Apple Developer Team in Xcode under `App` target > `Signing & Capabilities`.

## Generated assets

- Brand/icon source and requested icon sizes: `assets/brand/`
- iOS app icon catalog: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- iOS splash image catalog: `ios/App/App/Assets.xcassets/Splash.imageset/`
- App Store screenshots: `assets/app-store-screenshots/`
- App Store metadata: `docs/APP_STORE_METADATA.txt`
- GitHub Actions IPA build guide: `docs/GITHUB_ACTIONS_IOS_IPA.md`
- Xcode/TestFlight instructions: `docs/XCODE_TESTFLIGHT_INSTRUCTIONS.md`
- App Store Connect checklist: `docs/APP_STORE_CONNECT_CHECKLIST.md`
- Pre-submission checklist: `docs/PRE_SUBMISSION_CHECKLIST.md`

## Build an IPA in GitHub Actions

This repo includes a manual workflow at:

```text
.github/workflows/build-ios-ipa.yml
```

It builds the iOS app on a GitHub-hosted macOS runner and uploads a signed IPA artifact. Configure the Apple signing secrets first:

```text
APPLE_CERTIFICATE_BASE64
APPLE_CERTIFICATE_PASSWORD
APPLE_PROVISIONING_PROFILE_BASE64
APPLE_TEAM_ID
```

See `docs/GITHUB_ACTIONS_IOS_IPA.md` for exact setup steps.

## Current manual flags

- Apple signing assets are still required. For local builds, set signing in Xcode. For cloud builds, add the GitHub Actions secrets documented in `docs/GITHUB_ACTIONS_IOS_IPA.md`.
- Uploading the IPA still requires Apple's Transporter app or a future GitHub Actions upload step with an App Store Connect API key.
- A public Privacy Policy URL is required in App Store Connect. The project includes bundled pages under `www/privacy/` and `www/terms/`, but App Store Connect needs a publicly reachable URL.
