import Upload from "@/components/uploadVideo";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-slate-400">
      <h1 className="text-4xl font-bold text-center bg-slate-300 rounded-md px-8 py-4 mb-24">Twitch Raid Generator</h1>
      <div className="border bg-slate-300 rounded-md p-8 w-1/3 mb-4">
        <p className="font-mono">
          This is used to create custom iFrames for the Tangia Raid alert. Once you upload a video you will be given a unique URL that you can paste into your Tangia alert. The URL will spawn an animated version of the video you uploaded for every viewer in a raid.
        </p>
        <a href="https://app.tangia.co/twitch/alerts" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-800 break-all">
          Check out Tangia Alerts
        </a>
      </div>
      <div>
        <Upload />
      </div>
    </main>

  );
}
