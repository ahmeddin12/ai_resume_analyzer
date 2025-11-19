import { Link } from "react-router";
import ScoreCircle from "../Components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "../../lib/puter";

const getMimeFromPath = (path: string): string => {
  const p = path.toLowerCase();
  if (p.endsWith(".png")) return "image/png";
  if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return "image/jpeg";
  if (p.endsWith(".webp")) return "image/webp";
  if (p.endsWith(".gif")) return "image/gif";
  return "application/octet-stream";
};

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: { resume: Resume }) => {
  const { fs, puterReady } = usePuterStore();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let revokeUrl: string | null = null;

    const loadResume = async () => {
      try {
        if (!imagePath || !puterReady) return;
        const data: any = await fs.read(imagePath);
        if (!data) return;

        // Normalize to Blob in case Puter returns ArrayBuffer/Uint8Array
        const blob =
          data instanceof Blob
            ? data
            : new Blob([data], { type: getMimeFromPath(imagePath) });

        const url = URL.createObjectURL(blob);
        revokeUrl = url;
        setImageUrl(url);
      } catch (e) {
        console.error("Failed to load resume image from Puter:", e);
      }
    };

    loadResume();

    return () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [imagePath, puterReady, fs]);

  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="!text-black font-bold break-words">{companyName}</h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="!text-black font-bold">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {imageUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={imageUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};
export default ResumeCard