import Page from "@/app/components/PageComponent";
import { map } from "@/app/utils/pageMap";

const Post = async ({ params }: { params: { post: keyof typeof map } }) => {
    const page_id = map[params.post]

    return <Page page_id={page_id} />
}

export default Post