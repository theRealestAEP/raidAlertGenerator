
// export default function Page({ params }: { params: { uniqueid: string } }) {
//   // console.log(params);
//   const uniqueid = params?.uniqueid!;

//   // Construct the direct URL to the video file
//   const videoUrl = `https://vcoficzaxvqccchkrdke.supabase.co/storage/v1/object/public/videos/uploads/${uniqueid}`;

//   return (
//     <div>
//       <video controls src={videoUrl} style={{ width: '100%' }} autoPlay loop />
//     </div>
//   );
// };
'use client'
import { useSearchParams } from 'next/navigation'
 
import { useEffect, useState } from 'react';

export default function VideoPage({ params }:  { params: { uniqueid: string, viewers: string } }) {
  const [activeVideos, setActiveVideos] = useState(0);
  const maxVideos = 20;
  let viewers: string;
  let uniqueid = params.uniqueid;
  let pendingVideos = 0;
  const searchParams = useSearchParams()
 
  // const test = searchParams.get('viewers')
  useEffect(() => {
    if(searchParams.get('viewers') != null){
      viewers = searchParams.get('viewers')!
      pendingVideos = parseInt(viewers, 10) - maxVideos;
    }
  },[])
 
  useEffect(() => {
   
    const initialVideoCount = Math.min(parseInt(viewers, 10) || 1, maxVideos);
    for (let i = 0; i < initialVideoCount; i++) {
      createAndAnimateVideo(uniqueid);
    }

    return () => {
      // Cleanup to remove all videos if the component unmounts
      const container = document.querySelector('#container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  const createAndAnimateVideo = (uniqueid:string) => {
    setActiveVideos((prev) => prev + 1);

    let startPosBottom = Math.random() * 700;
    const startPosLeft = Math.random() * 100;
    const videoUrl = `https://vcoficzaxvqccchkrdke.supabase.co/storage/v1/object/public/videos/uploads/${uniqueid}`;
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.innerHTML = `<source src="${videoUrl}" type="video/webm">`;
    videoElement.style.position = 'absolute';
    videoElement.style.left = `${startPosLeft}%`;
    videoElement.style.bottom = `${startPosBottom}px`;
    videoElement.style.width = '100px';

    document.querySelector('#container')?.appendChild(videoElement);

    const fadeOutDuration = Math.random() * 2 + 1; // 1 to 3 seconds
    videoElement.style.transition = `opacity ${fadeOutDuration}s ease`;
    let animationFrameId: any;

    const animate = () => {
      startPosBottom += 2;
      videoElement.style.bottom = `${startPosBottom}px`;
      animationFrameId = requestAnimationFrame(animate);
    };

    setTimeout(() => {
      animate();
    }, 100); // Delay start to ensure styles are applied

    setTimeout(() => {
      videoElement.style.opacity = '0';
      cancelAnimationFrame(animationFrameId);

      setTimeout(() => {
        videoElement.remove();
        setActiveVideos((prev) => prev - 1);
        if (pendingVideos > 0) {
          pendingVideos--;
          createAndAnimateVideo(uniqueid);
        }
      }, fadeOutDuration * 1000);
    }, 2000); // Start fade out after 2 seconds
  };

  return (
    <div id="container" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }} className='bg-transparent'>
      {/* Placeholder for videos */}
    </div>
  );
}
