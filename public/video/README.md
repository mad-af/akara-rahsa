# Hero video

`HeroVideo.astro` currently runs on a poster image only. Drop real footage here
and the hero becomes the thing that actually differentiates this site.

## Spec

| Property   | Value                                              |
|------------|----------------------------------------------------|
| Resolution | 1920x1080                                          |
| Length     | 10 to 15 seconds, cut so the last frame matches the first |
| Formats    | `hero.mp4` (H.264, yuv420p) and `hero.webm` (VP9)  |
| Size       | Under 2 MB per file                                |
| Audio      | None. Strip the track entirely.                    |
| Poster     | `hero-poster.jpg`, 1920x1080, exported from frame 1 |

```sh
# MP4
ffmpeg -i source.mov -t 12 -an -vf scale=1920:-2 \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart hero.mp4

# WebM
ffmpeg -i source.mov -t 12 -an -vf scale=1920:-2 \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 hero.webm

# Poster
ffmpeg -i hero.mp4 -vframes 1 -q:v 3 hero-poster.jpg
```

## Wiring it up

In `src/pages/index.astro`:

```astro
<HeroVideo
  poster="/video/hero-poster.jpg"
  sources={[
    { src: '/video/hero.webm', type: 'video/webm' },
    { src: '/video/hero.mp4',  type: 'video/mp4'  },
  ]}
/>
```

## Hosting note

Free static hosts count these files against your build size, and visitors on
mobile data pay for every byte. Once the clip exists, the better path is
Cloudflare Stream or an unlisted Vimeo upload: pass `embedUrl` instead of
`sources` and the component renders the iframe, keeping the repo light.
