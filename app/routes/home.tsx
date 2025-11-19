import type { Route } from "./+types/home";
import Navbar from "../Components/NavBar";
import ResumeCard from "../Components/ResumeCard";
import {usePuterStore} from "../../lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind" },
        { name: "description", content: "Smart feedback for your dream job!" },
    ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            // Deduplicate resumes by a stable identifier to avoid duplicate React keys.
            // Prefer `id`; fall back to `imagePath` or `resumePath` if needed.
            const uniqueResumes: Resume[] = [];
            const seen = new Set<string>();
            for (const r of parsedResumes || []) {
                // Compose a stable signature for uniqueness
                const sig = (r?.id ?? '') || (r as any)?.imagePath || (r as any)?.resumePath;
                if (sig) {
                    if (!seen.has(sig)) {
                        seen.add(sig);
                        uniqueResumes.push(r);
                    }
                } else {
                    // If we cannot build a signature, keep the item (rare)
                    uniqueResumes.push(r);
                }
            }

            setResumes(uniqueResumes);
            setLoadingResumes(false);
        }

        loadResumes()
    }, []);

    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />

        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Track Your Applications & Resume Ratings</h1>
                {!loadingResumes && resumes?.length === 0 ? (
                    <h2>No resumes found. Upload your first resume to get feedback.</h2>
                ): (
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                )}
            </div>
            {loadingResumes && (
                <div className="flex flex-col items-center justify-center">
                    <img src="/images/resume-scan-2.gif" className="w-[200px]" />
                </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
                <div className="resumes-section">
                    {resumes.map((resume, index) => (
                        // Use a stable, unique key. Prefer `id`; fallback to composite with image/resume path and index.
                        <ResumeCard
                            key={resume.id || `${(resume as any)?.imagePath || (resume as any)?.resumePath || 'resume'}-${index}`}
                            resume={resume}
                        />
                    ))}
                </div>
            )}

            {!loadingResumes && resumes?.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                        Upload Resume
                    </Link>
                </div>
            )}
        </section>
    </main>
}