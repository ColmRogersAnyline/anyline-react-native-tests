export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDMwLAogICJhZHZhbmNlZEJhcmNvZGUiOiB0cnVlLAogICJtdWx0aUJhcmNvZGUiOiB0cnVlLAogICJzdXBwb3J0ZWRCYXJjb2RlRm9ybWF0cyI6IFsKICAgICJBTEwiCiAgXSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNob3dXYXRlcm1hcmsiOiB0cnVlLAogICJ0b2xlcmFuY2VEYXlzIjogMzAsCiAgInZhbGlkIjogIjIwMjMtMTItMzEiLAogICJpb3NJZGVudGlmaWVyIjogWwogICAgImlvLmFueWxpbmUuZXhhbXBsZXMiLAogICAgImlvLmFueWxpbmUuZXhhbXBsZXMuc3RvcmUiLAogICAgImlvLmFueWxpbmUuZXhhbXBsZXMuYnVuZGxlIiwKICAgICJpby5hbnlsaW5lLkFueWxpbmVFeGFtcGxlcyIsCiAgICAiaW8uYW55bGluZS5BbnlsaW5lRXhhbXBsZXMuYmV0YSIsCiAgICAiaW8uYW55bGluZS5BbnlsaW5lRXhhbXBsZXMudGVzdCIsCiAgICAiaW8uYW55bGluZS5leGFtcGxlcy50ZXN0IiwKICAgICJjb20uYW55bGluZS5wcm90b3R5cGVzIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImlvLmFueWxpbmUuZXhhbXBsZXMiLAogICAgImlvLmFueWxpbmUuZXhhbXBsZXMuc3RvcmUiLAogICAgImlvLmFueWxpbmUuZXhhbXBsZXMuYnVuZGxlIiwKICAgICJpby5hbnlsaW5lLkFueWxpbmVFeGFtcGxlcyIsCiAgICAiaW8uYW55bGluZS5BbnlsaW5lRXhhbXBsZXMuYmV0YSIsCiAgICAiaW8uYW55bGluZS5leGFtcGxlcy50ZXN0IgogIF0KfQpqaTVFOHFKS0EwczAzSEtYTlJxU3Avb3ozdnE5U2JRMUxOMm1XT3B3R1dFbWJNM0JuSEE0M3pvMjE5WGlwbTNKNFdhbXZLNVlreStFUVZ5Y2NSZXJ5dEZRR1pNTzE3WnY2RlBFeHBYZ2RlUFZOSWl0czBBVWVhempjSUYwWDlYdkY2cThzcVpzUHdZSTdVRnU3aFltYWNqWWJoWnJTb1NEMHF1QnpqdUQzWTRHT2xKcXlwb3VIcjNqRzN3VDRrbktnN0JDd3NDenJvVnp5U2I4TDJxWjYzdERJcnI3M3NibEI1ZTZZZ1RYdE5Ubk1XQzYyellkV2NDNHpuc08vbHc3bXZqaTFDb1FIVGtMRHFURkgza29kb0J0U0NCV2gxWmFNVTltdWVMbnR3d3FMUHpjTStsQmtXc3hZWndLd2Rwa2c3anZ5dTVYODBjWEg2MUVNUHpoYlE9PQ==',
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "viewPluginCompositeConfig": {
    "id": "parallel-first-vin-barcode",
    "processingMode": "parallelFirstScan",
    "viewPlugins": [
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "barcode",
            "barcodeConfig": {
              "barcodeFormats": ["ALL"]
            }
          },
          "scanFeedbackConfig": {
            "style": "rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "cornerRadius": 0,
            "beepOnResult": false,
            "vibrateOnResult": false,
            "blinkAnimationOnResult": true
          }
        }
      },
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "vin",
            "vinConfig": {}
          },
          "cutoutConfig": {
            "style": "rect",
            "maxWidthPercent": "85%",
            "alignment": "top_half",
            "ratioFromSize": { "width": 62, "height": 9 },
            "offset": { "x": 0, "y": 0 },
            "outerColor": "000000",
            "outerAlpha": 0,
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "cornerRadius": 4,
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedbackConfig": {
            "style": "contour_rect",
            "animation": "traverse_multi",
            "animationDuration": 250,
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "220099FF",
            "beepOnResult": false,
            "vibrateOnResult": false,
            "blinkAnimationOnResult": true
          }
        }
      }
    ]
  }
}