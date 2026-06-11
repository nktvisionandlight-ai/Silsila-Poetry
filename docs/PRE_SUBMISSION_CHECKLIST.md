# Silsila Pre-submission Checklist

## Automated or remote checks from this environment

- [x] Live app URL responds: `https://silsila-poetry.replit.app/`
- [x] Capacitor app ID configured: `com.silsila.app`
- [x] Capacitor app name configured: `Silsila`
- [x] Capacitor `webDir` configured: `www`
- [x] Capacitor remote server URL configured: `https://silsila-poetry.replit.app/`
- [x] iOS project generated under `ios/App`
- [x] iOS bundle identifier configured as `com.silsila.app`
- [x] iOS marketing version configured as `1.0.0`
- [x] iOS build number configured as `1`
- [x] Required requested icon sizes generated:
  - `assets/brand/app-store-1024.png`
  - `assets/brand/iphone-180@3x.png`
  - `assets/brand/iphone-120@2x.png`
  - `assets/brand/ipad-pro-167.png`
  - `assets/brand/ipad-152@2x.png`
- [x] iOS AppIcon asset catalog populated.
- [x] iOS launch/splash asset generated.
- [x] Local bundled privacy page created at `www/privacy/index.html`.
- [x] Local bundled terms page created at `www/terms/index.html`.
- [x] App Store metadata text file created.
- [x] App Store screenshot PNGs generated.

## Manual checks required on your Mac/iOS devices

- [ ] App loads in under 3 seconds on a physical device.
- [ ] No Safari/WebKit console errors when inspected from Safari Develop tools.
- [ ] Works on iPhone SE smallest supported size.
- [ ] Works on iPhone Pro Max largest supported size.
- [ ] Works on iPad.
- [ ] All navigation works.
- [ ] No blank or broken screens.
- [ ] Dark mode works.
- [ ] Fonts load correctly.
- [ ] All poems display in Urdu script, romanized, and English correctly.
- [ ] Poet profiles load correctly.
- [ ] Save/bookmark works.
- [ ] Share poem as image works.
- [ ] Search works.
- [ ] Browse by mood works.
- [ ] Privacy Policy URL is publicly reachable and renders policy text.
- [ ] Terms URL is publicly reachable and renders terms text.

## Current flags

- The live `/privacy` and `/terms` URLs still appeared to return the same SPA HTML shell when checked from this environment. For App Store submission, host actual public policy/terms pages at those routes or another stable public URL.
- Xcode archive, signing, TestFlight, and device-size testing must be completed on your Mac with your Apple Developer membership.
