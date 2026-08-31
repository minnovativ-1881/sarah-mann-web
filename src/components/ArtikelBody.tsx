import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { slugify } from "@/lib/artikel";

type A = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type H = React.HTMLAttributes<HTMLElement>;

function textAus(kinder: React.ReactNode): string {
  if (typeof kinder === "string") return kinder;
  if (Array.isArray(kinder)) return kinder.map(textAus).join("");
  if (kinder && typeof kinder === "object" && "props" in kinder) {
    // @ts-expect-error React-Kind mit props
    return textAus(kinder.props?.children);
  }
  return "";
}

export default function ArtikelBody({ inhalt }: { inhalt: string }) {
  return (
    <div className="artikel-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ children, ...p }: H) => (
            <h2
              id={slugify(textAus(children))}
              className="font-serif text-deep mt-14 mb-5 scroll-mt-28"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", lineHeight: 1.25 }}
              {...p}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...p }: H) => (
            <h3
              id={slugify(textAus(children))}
              className="font-serif text-deep mt-10 mb-4 scroll-mt-28"
              style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)", lineHeight: 1.3 }}
              {...p}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...p }: H) => (
            <p className="text-deep/85 leading-relaxed mb-6" style={{ fontSize: "1.13rem" }} {...p}>
              {children}
            </p>
          ),
          a: ({ href, children, ...p }: A) => {
            const intern = href?.startsWith("/");
            if (intern) {
              return (
                <Link href={href!} className="text-terra underline underline-offset-4 hover:text-terra-light">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terra underline underline-offset-4 hover:text-terra-light"
                {...p}
              >
                {children}
              </a>
            );
          },
          ul: ({ children, ...p }: H) => (
            <ul className="mb-7 space-y-3 pl-1" {...p}>
              {children}
            </ul>
          ),
          ol: ({ children, ...p }: H) => (
            <ol className="mb-7 space-y-3 list-decimal pl-6 marker:text-terra marker:font-serif" {...p}>
              {children}
            </ol>
          ),
          li: ({ children, ...p }: H) => (
            <li className="text-deep/85 leading-relaxed" style={{ fontSize: "1.08rem" }} {...p}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...p }: H) => (
            <blockquote
              className="border-l-2 border-terra pl-6 my-9 font-serif italic text-deep"
              style={{ fontSize: "1.35rem", lineHeight: 1.5 }}
              {...p}
            >
              {children}
            </blockquote>
          ),
          strong: ({ children, ...p }: H) => (
            <strong className="text-deep font-medium" {...p}>
              {children}
            </strong>
          ),
          table: ({ children, ...p }: H) => (
            <div className="my-9 overflow-x-auto">
              <table className="w-full border-collapse text-left" {...p}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...p }: H) => (
            <thead className="border-b-2 border-terra" {...p}>
              {children}
            </thead>
          ),
          th: ({ children, ...p }: H) => (
            <th className="py-3 pr-6 text-overline text-terra align-bottom" {...p}>
              {children}
            </th>
          ),
          td: ({ children, ...p }: H) => (
            <td className="py-4 pr-6 align-top text-deep/85 border-b border-cream-mid" {...p}>
              {children}
            </td>
          ),
          hr: () => <hr className="my-12 border-0 h-px bg-cream-mid" />,
        }}
      >
        {inhalt}
      </Markdown>
    </div>
  );
}
