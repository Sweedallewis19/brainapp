import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}
declare global {
  interface Window {
    twttr: any;
  }
}


// Helper to convert any YouTube link to embeddable form
function getYoutubeEmbedUrl(link: string): string {
    const match = link.match(/(?:youtu\.be\/|v=)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

export function Card({ title, link, type }: CardProps) {
    useEffect(() => {
        if (type === "twitter") {
            if (window.twttr === undefined) {
                const script = document.createElement("script");
                script.src = "https://platform.twitter.com/widgets.js";
                script.async = true;
                document.body.appendChild(script);
            } else if (window.twttr && window.twttr.widgets) {
                window.twttr.widgets.load();
            }
        }
    }, [type, link]);

    return (
        <div>
            <div className="p-4 bg-white rounded-md border-gray-200 max-w-96 border min-h-48 min-w-80">
                {/* Header */}
                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            <ShareIcon />
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="text-gray-500">
                            <ShareIcon />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full aspect-video rounded"
                            src={getYoutubeEmbedUrl(link)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}
