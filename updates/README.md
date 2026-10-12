# RSS update history

The public English feed is built at `/ribo-arena/feed.xml` from displayed benchmark
results. It includes new/removed targets, mean TM-score ranks and scores, method
coverage, and evaluated candidate counts. No email service or credentials are used.

When importing a new results export, run:

```sh
node scripts/record-rss.mjs
node scripts/build.mjs
node --test scripts/rss.test.mjs
```

Commit `updates/history.json` together with the results. The recording step keeps
earlier updates available to readers; it never modifies evaluation data. Unchanged
data is not recorded twice. The build also includes an unrecorded current snapshot,
but that snapshot must be archived before the next import to retain its history.

The September 28 snapshot is comparison-only. The first feed entry describes the
October update already published in News. Stable content-based GUIDs and retained
publication dates prevent rebuilds or styling changes from triggering duplicate
notifications. Publishing a site updates the feed; readers poll it on their own
schedule. This is not an email subscription or a scheduled benchmark run.
