# Build the Silsila iOS IPA with GitHub Actions

This repository includes a GitHub Actions workflow that builds the Capacitor iOS app on a cloud macOS runner with Xcode installed.

Workflow file:

```text
.github/workflows/build-ios-ipa.yml
```

Output:

```text
Silsila-App-Store-IPA
```

The output artifact contains a signed `.ipa` file suitable for App Store Connect/TestFlight, as long as the Apple signing certificate and provisioning profile secrets are configured correctly.

## What this solves

You do not need to install the full 16 GB+ Xcode app locally just to build the IPA. GitHub Actions runs the build on a temporary Mac with Xcode.

## What you still need

Apple requires every App Store IPA to be signed. The workflow needs these GitHub Actions secrets:

| Secret name | What it is |
| --- | --- |
| `APPLE_CERTIFICATE_BASE64` | Base64-encoded `.p12` Apple Distribution certificate |
| `APPLE_CERTIFICATE_PASSWORD` | Password for that `.p12` certificate |
| `APPLE_PROVISIONING_PROFILE_BASE64` | Base64-encoded App Store provisioning profile for `com.silsila.app` |
| `APPLE_TEAM_ID` | Your Apple Developer Team ID |

## Create the Apple signing files

You can create these from Apple Developer without installing Xcode, but you do need access to your Apple Developer account.

### 1. Bundle ID

In Apple Developer, create or confirm this explicit App ID:

```text
com.silsila.app
```

### 2. Apple Distribution certificate

Create an `Apple Distribution` certificate in Apple Developer and export it as a `.p12` file.

The `.p12` must include the private key. If you create the certificate request on your Mac using Keychain Access, export the final certificate/private key pair from Keychain Access as `.p12`.

### 3. App Store provisioning profile

Create an App Store provisioning profile for:

```text
com.silsila.app
```

Download the `.mobileprovision` file.

## Convert files to base64

On your Mac, open Terminal in the folder containing the signing files.

For the `.p12` certificate:

```bash
base64 -i YourCertificate.p12 | pbcopy
```

Paste that copied value into the GitHub secret:

```text
APPLE_CERTIFICATE_BASE64
```

For the `.mobileprovision` file:

```bash
base64 -i YourProfile.mobileprovision | pbcopy
```

Paste that copied value into the GitHub secret:

```text
APPLE_PROVISIONING_PROFILE_BASE64
```

## Add secrets in GitHub

1. Open the GitHub repository.
2. Go to `Settings`.
3. Go to `Secrets and variables`.
4. Open `Actions`.
5. Click `New repository secret`.
6. Add each required secret:
   - `APPLE_CERTIFICATE_BASE64`
   - `APPLE_CERTIFICATE_PASSWORD`
   - `APPLE_PROVISIONING_PROFILE_BASE64`
   - `APPLE_TEAM_ID`

## Run the workflow

1. Open the GitHub repository.
2. Go to the `Actions` tab.
3. Select `Build iOS IPA`.
4. Click `Run workflow`.
5. Choose the `cursor/capacitor-ios-wrapper-bbc9` branch.
6. Optionally enter a new build number.
7. Click `Run workflow`.

## Download the IPA

1. Open the completed workflow run.
2. Scroll to `Artifacts`.
3. Download `Silsila-App-Store-IPA`.
4. Unzip the artifact.
5. The `.ipa` file is inside.

## Upload to App Store Connect

The App Store Connect website does not usually accept direct IPA uploads in the browser. Use one of these options:

- Apple's Transporter app, which is much smaller than Xcode.
- A later GitHub Actions upload step using an App Store Connect API key.

The generated IPA is intended for App Store Connect/TestFlight distribution, provided it was signed with an Apple Distribution certificate and an App Store provisioning profile.

## Common failures

### Missing secret

The workflow stops immediately and names the missing secret. Add it under GitHub repository Actions secrets.

### No matching provisioning profile

Make sure the provisioning profile is:

- Type: App Store
- Bundle ID: `com.silsila.app`
- Team: the same team as `APPLE_TEAM_ID`
- Certificate: the same Apple Distribution certificate you uploaded as `.p12`

### Certificate/password error

Make sure `APPLE_CERTIFICATE_PASSWORD` matches the password used when exporting the `.p12` from Keychain Access.
