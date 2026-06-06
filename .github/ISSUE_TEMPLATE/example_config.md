---
name: Example config
about: Suggest a new safe example config
title: "example: "
labels: documentation, good first issue
assignees: ""
---

## Webapp

Name of the webapp:

Public URL:

## Proposed config

Remove private URLs or account-specific data first.

```json
{
  "appId": "",
  "appName": "",
  "startUrl": "https://example.com/",
  "allowedHosts": [
    "example.com"
  ],
  "window": {
    "width": 1280,
    "height": 800,
    "frame": false,
    "backgroundColor": "#111111"
  },
  "hideScrollbars": true
}
```

## Notes

Does this webapp need extra login or OAuth hosts?
