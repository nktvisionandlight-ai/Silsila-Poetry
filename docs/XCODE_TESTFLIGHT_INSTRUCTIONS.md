# Xcode and TestFlight Instructions for Silsila

## Open the iOS project in Xcode

1. On your Mac, install dependencies if needed:
   ```bash
   npm install
   ```
2. Sync the Capacitor project:
   ```bash
   npm run sync:ios
   ```
3. Open the iOS project:
   ```bash
   npm run open:ios
   ```
   Or open this file directly in Finder:
   ```text
   ios/App/App.xcodeproj
   ```

## Set your Apple Developer Team

1. In Xcode, select the blue `App` project in the left navigator.
2. Select the `App` target.
3. Open the `Signing & Capabilities` tab.
4. Check `Automatically manage signing`.
5. In `Team`, choose your active Apple Developer team.
6. If Xcode prompts you to register or repair signing, accept the prompt.

Manual input needed: your Apple Developer Team must be selected on your Mac. This cannot be completed from this Linux environment.

## Confirm the bundle identifier

1. In the same `Signing & Capabilities` tab, confirm `Bundle Identifier` is:
   ```text
   app.silsilapoetry
   ```
2. If Xcode shows another value, replace it with `app.silsilapoetry`.

The project file in this repository is already configured with `PRODUCT_BUNDLE_IDENTIFIER = app.silsilapoetry`.

## Set the version to 1.0.0

1. Select the `App` target.
2. Open the `General` tab.
3. Under `Identity`, set:
   - Version: `1.0.0`
   - Build: `1`

The project file in this repository is already configured with `MARKETING_VERSION = 1.0.0` and `CURRENT_PROJECT_VERSION = 1`.

## Test on your own phone first

1. Connect your iPhone to your Mac.
2. In Xcode's device selector, choose your iPhone.
3. Press `Run`.
4. Confirm:
   - The app launches.
   - The live Silsila app loads.
   - Navigation works.
   - Saved poems work.
   - The app renders correctly on your device.

## Archive the build

1. In Xcode, select `Any iOS Device (arm64)` or a generic iOS device destination.
2. In the top menu, choose `Product` > `Archive`.
3. Wait for the archive to complete.
4. Xcode should open the Organizer window automatically.

## Upload to App Store Connect

1. In Organizer, select the latest Silsila archive.
2. Click `Distribute App`.
3. Select `App Store Connect`.
4. Select `Upload`.
5. Keep automatic signing enabled unless you have a custom signing workflow.
6. Follow Xcode's validation prompts.
7. Click `Upload`.
8. Wait for the upload to finish.
9. In App Store Connect, wait for processing to complete under TestFlight.

## Set up TestFlight for beta testing on your own phone

1. Go to <https://appstoreconnect.apple.com/>.
2. Open `My Apps`.
3. Select `Silsila`.
4. Open the `TestFlight` tab.
5. Wait for the uploaded build to finish processing.
6. If Apple asks for beta app review details, fill them in.
7. Under `Internal Testing`, create an internal tester group if one does not exist.
8. Add your Apple ID email to the internal tester group.
9. Select the processed build and add it to that tester group.
10. Install Apple's `TestFlight` app on your iPhone.
11. Accept the TestFlight invitation from email or inside TestFlight.
12. Install Silsila from TestFlight.
13. Run through the pre-submission checklist on your phone before submitting for App Review.
