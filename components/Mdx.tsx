import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import Prose from "@/components/Prose";
import { MDXImg } from "@/components/MdxComponents";

// The page already has its <h1>; content-level "#" headings become <h2>.
const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />;

export default function Mdx({ source }: { source: string }) {
  return (
    <Prose>
      <MDXRemote
        source={source}
        components={{ img: MDXImg, h1: H2 }}
        options={{
          mdxOptions: { remarkPlugins: [remarkGfm, remarkUnwrapImages] },
        }}
      />
    </Prose>
  );
}
