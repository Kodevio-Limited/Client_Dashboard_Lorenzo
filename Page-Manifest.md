# Page Manifest

## Manifest Table

| Tab / Section | Page Folder | Route | Figma Export | Entity Name | Table? | Modal? | Notes |
|---|---|---|---|---|---|---|---|
| Auth | `login/` | `/login` | `Login.svg` | — | No | No | No sidebar, full-screen layout |
| Auth | `reset-login/` | `/reset-login` | `Reset Login.svg` | — | No | No | No sidebar, full-screen layout |
| Auth | `set-new-pass/` | `/set-new-pass` | `Set New Pass.svg` | — | No | No | No sidebar, full-screen layout |
| Property | `property/` | `/dashboard/property` | `Property Dashboard.svg` | `Property` | No | No | Main property dashboard with cards, charts, stats |
| Property | `property/history/` | `/dashboard/property/history` | `History.svg` | `Property` | Yes | No | History table |
| Property | `property/media/` | `/dashboard/property/media` | `Media.svg` | `Property` | No | No | Media gallery grid |
| Photos | `photos/` | `/dashboard/photos` | `Photos.svg` | `Photo` | No | No | Photo gallery |
| Profile | `account/profile/` | `/dashboard/account/profile` | `Profile.svg` | — | No | No | Profile settings form |
| Profile | `account/update-pass/` | `/dashboard/account/update-pass` | `Update pass.svg` | — | No | No | Password change form |
| Reports | `reports/` | `/dashboard/reports` | `Reports.svg` | `Report` | Yes | No | Reports table |

## Entity Registry

| Entity Name | Fields (rough) | Used On Pages |
|---|---|---|
| `Property` | id, name, address, status, value, image | property/, property/history/, property/media/ |
| `Photo` | id, url, title, date | photos/ |
| `Report` | id, title, type, date, status, url | reports/ |
