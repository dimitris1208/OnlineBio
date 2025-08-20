import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import Prose from "@/components/Prose";
import { MDXImg } from "@/components/MdxComponents";

export default function Mdx({ source }: { source: string }) {
  return (
    <Prose>
      <MDXRemote
        source={source}
        components={{ img: MDXImg }}
        options={{
          mdxOptions: { remarkPlugins: [remarkGfm, remarkUnwrapImages] },
        }}
      />
    </Prose>
  );
}
