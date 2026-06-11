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
- Xcode/TestFlight instructions: `docs/XCODE_TESTFLIGHT_INSTRUCTIONS.md`
- App Store Connect checklist: `docs/APP_STORE_CONNECT_CHECKLIST.md`
- Pre-submission checklist: `docs/PRE_SUBMISSION_CHECKLIST.md`

## Current manual flags

- Apple Developer Team selection, signing, archive, upload, and TestFlight must be completed on a Mac in Xcode.
- A public Privacy Policy URL is required in App Store Connect. The project includes bundled pages under `www/privacy/` and `www/terms/`, but App Store Connect needs a publicly reachable URL.
