import * as Sentry from "@sentry/cloudflare";

export default Sentry.withSentry(
  () => ({
    dsn: "https://1723b17fad95838e3e5a5375b8d18c1e@o4512244812611584.ingest.de.sentry.io/4512244838236240",
  }),
  {
    async fetch(request, env) {
      return env.ASSETS.fetch(request);
    },
  } satisfies ExportedHandler<Env>,
);
