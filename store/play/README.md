# Play assets

Store artwork for the Google Play listing. Nothing in this folder ships with
the website: the Next.js export only copies `public/`, so these files are here
to be uploaded by hand.

## What is here

```
store/play/
  listing.md              copy for the listing (title, short, long, notes)
  icon-512.png            app icon at Play's size (see the note in listing.md)
  screenshots/            8 marketing screenshots, 1080 × 1920 PNG
    01-calendar.png
    02-scan-timetable.png
    03-voice.png
    04-search.png
    05-themes.png
    06-settings.png
    07-backup.png
    08-dark-mode.png
```

## How the screenshots are made

They are composed, not hand-edited. Each one is a 1080 × 1920 frame with:

- the site's warm white background and a faint violet/amber aurora at the
  bottom, the same colours as the landing page's closing section;
- an eyebrow in 25px Gellix SemiBold, a headline in 88px Gellix SemiBold with
  −0.038em tracking, and a 36px subline;
- the app screen inside a 600 × 1299 rounded frame (58px radius) with the
  site's layered shadow;
- the Lektra icon and wordmark at the bottom.

Screens 1–7 are the app screenshots already in `public/` (the same ones the
landing page uses). Screen 8 is a fresh capture of the app in dark mode with
dot markers, taken from the live app at 1170 × 2532 and scaled into the frame.

To change a headline, edit the slide list in the composition and re-render. Keep
headlines short enough to stay on one line at 88px (roughly 20 characters); a
wrapped headline runs into the phone, which sits at a fixed offset.

## Rules of thumb

- 1080 × 1920 is 9:16, inside Play's 320–3840px and 1:2–2:1 limits.
- Keep the first two screens the strongest: the month grid and timetable scan
  explain the app fastest.
- Every image shows a real screen. The dark shot uses the app's dot markers
  instead of text markers because it reads better at carousel size; it is a
  real setting, not a mock-up.
